package com.example.backend.security.config;

import com.example.backend.security.JwtAuthenticationEntryPoint;
import com.example.backend.security.filters.JwtAuthenticationFilter;
import com.example.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {


    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Bean
    public JwtAuthenticationFilter authenticationTokenFilterBean() {
        return new JwtAuthenticationFilter();
    }


    // used to be "configure()" method from deprecated WebSecurityConfigurerAdapter
    // from https://www.youtube.com/watch?v=X80nJ5T7YpE&list=PLqq-6Pq4lTTYTEooakHchTGglSvkZAjnE&index=12
    // up-to-date documentation: https://spring.io/guides/gs/securing-web/

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and() // do not create a session! -> use jwt
                //.exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and() // handle 403 forbidden errors for login -> see https://stackoverflow.com/questions/59555526/requets-return-only-403-forbidden-even-if-csrf-is-disabled-spring-security-jw
                .authorizeHttpRequests()
                .requestMatchers(HttpMethod.POST, "/api/users/login").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/users/register").permitAll()
                .requestMatchers(HttpMethod.PUT, "/api/users/confirm-sign-up**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/users/reset-password**").permitAll()
                .requestMatchers(HttpMethod.PUT, "/api/users/update-password").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/workshops/upcoming").permitAll()
                .requestMatchers(HttpMethod.GET, "/scores/**").authenticated()
                .requestMatchers(HttpMethod.POST, "/scores/**").authenticated()
                .anyRequest().authenticated() // any other request needs to be authenticated!
                //.anyRequest().permitAll()
                .and().formLogin().disable(); // type of login, that Spring should do
        http.addFilterBefore(authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // try to remove deprecations
    /*@Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .cors(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // do not create a session! -> use jwt
                .exceptionHandling((exceptionHandling) -> exceptionHandling.authenticationEntryPoint(jwtAuthenticationEntryPoint)) // handle 403 forbidden errors for login -> see https://stackoverflow.com/questions/59555526/requets-return-only-403-forbidden-even-if-csrf-is-disabled-spring-security-jw
                .authorizeHttpRequests(auth -> auth
                                .requestMatchers(HttpMethod.POST, "/api/users/login").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/users/register").permitAll()
                                .requestMatchers(HttpMethod.PUT, "/api/users/confirm-sign-up**").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/users/reset-password**").permitAll()
                                .requestMatchers(HttpMethod.PUT, "/api/users/update-password").permitAll()
                                .anyRequest().authenticated() // any other request needs to be authenticated!
                        //.anyRequest().permitAll()
                )
                //.and().formLogin().disable(); // type of login, that Spring should do
                .addFilterBefore(authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class) // adding the authenticationTokenFilterBean() before the UsernamePasswordAuthFilter

                .build();
    }*/


    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(this.userService)
                .passwordEncoder(this.passwordEncoder);
    }

    // enable usage of AuthenticationManager in AuthenticationController.class
    @Bean
    AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    // ENABLE METHODS IN HEADER (to be able to make requests from frontend)
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Collections.singletonList("*"));
        configuration.setAllowedHeaders(Collections.singletonList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
