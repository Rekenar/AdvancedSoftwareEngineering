package com.example.backend.controllers;

import com.example.backend.Exceptions.TokenNotFoundException;
import com.example.backend.dtos.SignUpSuccessDTO;
import com.example.backend.dtos.UserDetailsDTO;
import com.example.backend.messages.SuccessMessages;
import com.example.backend.models.ConfirmSignUpTokenEntity;
import com.example.backend.models.UserEntity;
import com.example.backend.security.jwt.JwtUtil;
import com.example.backend.security.models.AuthenticationRequest;
import com.example.backend.security.models.AuthenticationResponse;
import com.example.backend.services.ConfirmSignUpTokenService;
import com.example.backend.services.UserService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    UserService userService;

    @Autowired
    ConfirmSignUpTokenService confirmSignUpTokenService;

    @Value("${FRONTEND_URL}")
    private String frontendUrl;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        logger.info(authenticationRequest.getUsername());
        logger.info(authenticationRequest.getPassword());
        try {
            logger.info("Before authenticationManager.authenticate");
            logger.info("Username: {}", authenticationRequest.getUsername());
            logger.info("Password: {}", authenticationRequest.getPassword());
            //List<GrantedAuthority> grantedAuthorityList = new LinkedList<>();
            //grantedAuthorityList.add(new SimpleGrantedAuthority("ROLE_USER"));
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword());
            logger.info("token: {}", usernamePasswordAuthenticationToken);
            Authentication authentication = null;
            try {
                authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken);
                // Successful authentication logic here
            } catch (AuthenticationException e) {
                // Failed authentication logic here
                logger.error("Authentication failed: {}", e.getMessage());
            }
            logger.info("After authenticationManager.authenticate");
            try {
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (Exception e){
                logger.warn("stuff happened");
            }
            logger.info("Authentication successful");
        } catch (BadCredentialsException e) {
            logger.error("Authentication failed: Incorrect username or password", e);
            throw new Exception("Incorrect username or password", e);
        }
        logger.warn("now here");
        final UserDetailsDTO userDetails = (UserDetailsDTO) userService.loadUserByUsername(authenticationRequest.getUsername());
        final boolean isEnabled = userDetails.isEnabled();
        if (!isEnabled) throw new Exception("user not enabled");

        final String token = jwtUtil.generateToken(userDetails);

        final String username = userDetails.getUsername();

        return ResponseEntity.ok(new AuthenticationResponse(
                token,
                userService.loadUserIdByUsername(username),
                username,
                (List<GrantedAuthority>) userDetails.getAuthorities(), // ROLES are set here
                jwtUtil.extractExpiration(token),
                jwtUtil.getEXPIRATION_TIME() - 10));
    }


    /**
     * CREATING USER BEFORE SIGN UP PROCESS
     */
    @PostMapping("/register")
    @PreAuthorize("permitAll()")
    public ResponseEntity<SignUpSuccessDTO> createUser(@Valid @RequestBody UserDetailsDTO dto) {
        UserEntity user = userService.createUser(dto);
        String token = UUID.randomUUID().toString();
        ConfirmSignUpTokenEntity confirmSignUpToken = confirmSignUpTokenService.createConfirmSignUpTokenForUser(user, token);

        // Send confirmation email to user
        String confirmUrl = frontendUrl + "users/confirm-sign-up?token=" + token;

        // TODO -> sending success Mail

        return ResponseEntity.ok(confirmSignUpTokenService.getSignupTokenSuccessBody(confirmUrl));
    }


    /**
     * USER SIGN UP PROCESS
     */
    @PutMapping("/confirm-sign-up")
    public ResponseEntity<String> confirmRegistration(@RequestParam("token") String token) throws Exception {
        if (!confirmSignUpTokenService.validateConfirmPasswordToken(token)) {
            throw new TokenNotFoundException("CONFIRM_REGISTRATION_TOKEN_NOT_EXISTS");
        }
        UserEntity user = confirmSignUpTokenService.loadUserByConfirmSignUpToken(token);
        userService.confirmUserSignUp(user, token);

        // Send confirmation email to user
        String confirmUrl = frontendUrl + "users/confirm-sign-up?token=" + token;

        // TODO -> sending success Mail

        return ResponseEntity.ok(SuccessMessages.REGISTRATION_SUCCSESS_MAIL_SENT.getMessage());
    }
}
