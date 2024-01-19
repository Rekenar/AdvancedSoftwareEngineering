package com.example.backend.controllers;

import com.example.backend.Exceptions.TokenNotFoundException;
import com.example.backend.dtos.PasswordDTO;
import com.example.backend.dtos.SignUpSuccessDTO;
import com.example.backend.dtos.UserDetailsDTO;
import com.example.backend.dtos.UsernameDTO;
import com.example.backend.mail.MailEvent;
import com.example.backend.messages.ErrorMessages;
import com.example.backend.messages.SuccessMessages;
import com.example.backend.models.UserEntity;
import com.example.backend.security.jwt.JwtUtil;
import com.example.backend.security.models.AuthenticationRequest;
import com.example.backend.security.models.AuthenticationResponse;
import com.example.backend.services.ConfirmSignUpTokenService;
import com.example.backend.services.PasswordResetService;
import com.example.backend.services.UserService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Map;
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

    @Autowired
    PasswordResetService passwordResetService;

    @Autowired
    private ApplicationEventPublisher applicationEventPublisher;

    @Value("${FRONTEND_URL}")
    private String frontendUrl;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @PostMapping("/login") // creating Authentication Token
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) {
        logger.info("HELLO FROM LOGIN");
        logger.info(authenticationRequest.getUsername());
        logger.info(authenticationRequest.getPassword());
        try {
            logger.info("Before authenticationManager.authenticate");
            logger.info("Username: {}", authenticationRequest.getUsername());
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword());
            Authentication authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken);

            // Successful authentication logic here
            SecurityContextHolder.getContext().setAuthentication(authentication);
            logger.info("Authentication successful");

            final UserDetailsDTO userDetails = (UserDetailsDTO) userService.loadUserByUsername(authenticationRequest.getUsername());
            final boolean isEnabled = userDetails.isEnabled();
            if (!isEnabled) {
                logger.error("User is not enabled");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not enabled");
            }

            final String token = jwtUtil.generateToken(userDetails);

            // remove all unused PasswordResetToken
            passwordResetService.deletePasswordResetTokenByUsername(userDetails.getUsername());

            return ResponseEntity.ok(new AuthenticationResponse(
                    token,
                    userService.loadUserIdByUsername(userDetails.getUsername()),
                    userDetails.getUsername(),
                    (List<GrantedAuthority>) userDetails.getAuthorities(), // ROLES are set here
                    jwtUtil.extractExpiration(token),
                    jwtUtil.getEXPIRATION_TIME() - 10));
        } catch (BadCredentialsException e) {
            logger.error("Authentication failed: Incorrect username or password", e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect username or password");
        } catch (Exception e) {
            logger.error("Authentication failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed");
        }
    }


    /**
     * CREATING USER BEFORE SIGN UP PROCESS
     * setting @is_enabled to false -> login not allowed
     */
    @PostMapping("/register")
    @PreAuthorize("permitAll()")
    public ResponseEntity<SignUpSuccessDTO> createUser(@Valid @RequestBody UserDetailsDTO dto) {
        UserEntity user = userService.createUser(dto);
        String token = UUID.randomUUID().toString();
        confirmSignUpTokenService.createConfirmSignUpTokenForUser(user, token);

        // Send confirmation email
        String confirmUrl = frontendUrl + "users/register?token=" + token;
        MailEvent event = new MailEvent(this, user.getUsername(), "MinigamesHUB: Confirm registration",
                Map.of("username", user.getUsername(), "confirmUrl", confirmUrl),
                "register-email.html");
        applicationEventPublisher.publishEvent(event);

        return ResponseEntity.ok(confirmSignUpTokenService.getSignupTokenSuccessBody(confirmUrl));
    }


    /**
     * USER SIGN UP PROCESS
     * setting @is_enabled to true -> allow login
     */
    @PutMapping("/register")
    public ResponseEntity<String> confirmRegistration(@RequestParam("token") String token) throws Exception {
        if (!confirmSignUpTokenService.validateConfirmPasswordToken(token)) {
            throw new TokenNotFoundException("CONFIRM_REGISTRATION_TOKEN_NOT_EXISTS");
        }
        UserEntity user = confirmSignUpTokenService.loadUserByConfirmSignUpToken(token);
        userService.confirmUserSignUp(user, token);

        // Send registration successful Email
        String confirmUrl = frontendUrl + "users/register?token=" + token;
        MailEvent event = new MailEvent(this, user.getUsername(), "MinigamesHUB: Confirm registration",
                Map.of("username", user.getUsername(), "confirmUrl", confirmUrl),
                "register-success-email.html");
        applicationEventPublisher.publishEvent(event);

        return ResponseEntity.ok(SuccessMessages.REGISTRATION_SUCCSESS_MAIL_SENT.getMessage());
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserDetailsDTO> getUserById(@PathVariable("username") String username) throws Exception {
        UserDetails user = userService.loadUserByUsername(username);
        UserDetailsDTO dto = userService.convertUserDetailsToUserDetailsDTO(user);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody UsernameDTO dto) {
        passwordResetService.deletePasswordResetTokenByUsername(dto.getUsername());
        UserEntity user = userService.loadUserEntityByUsername(dto.getUsername());
        String token = UUID.randomUUID().toString();
        passwordResetService.setPasswordResetToken(user, token);

        // sending Mail wir PW-reset Link
        String resetPasswordUrl = frontendUrl + "users/change-password?token=" + token;
        MailEvent event = new MailEvent(this, user.getUsername(), "MinigamesHUB: Reset password",
                Map.of("username", user.getUsername(), "resetPasswordUrl", resetPasswordUrl),
                "reset-password-email.html");
        applicationEventPublisher.publishEvent(event);

        return ResponseEntity.ok(SuccessMessages.PASSWORD_RESET_LINK_SENT.getMessage());
    }

    @PutMapping("/reset-password")
    public ResponseEntity<?> validateTokenAndResetPassword(@Valid @RequestBody PasswordDTO passwordDto) {
        if (!passwordResetService.validatePasswordResetToken(passwordDto.getToken())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ErrorMessages.PASSWORD_RESET_TOKEN_NOT_FOUND.getMessage());
        }
        UserEntity user = passwordResetService.loadUserByPasswordResetToken(passwordDto.getToken());
        passwordResetService.changePassword(user, passwordDto.getNewPassword());

        passwordResetService.deletePasswordResetTokenByToken(passwordDto.getToken());
        return ResponseEntity.ok(SuccessMessages.PASSWORD_UPDATE_SUCCESSFUL.getMessage());
    }


}
