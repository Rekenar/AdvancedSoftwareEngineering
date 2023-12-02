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
import io.jsonwebtoken.Jwts;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @Value("${FRONTEND_URL}")
    private String frontendUrl;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetailsDTO userDetails = (UserDetailsDTO) userService.loadUserByUsername(authenticationRequest.getUsername());

        final boolean isEnabled = userDetails.isEnabled();
        if (!isEnabled) throw new Exception("user not enabled");

        final String token = jwtUtil.generateToken(userDetails);

        final String username = userDetails.getUsername();

        return ResponseEntity.ok(new AuthenticationResponse(
                token,
                userService.loadUserIdByUsername(username),
                username,
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

        return ResponseEntity.ok(SuccessMessages.REGISTRATION_SUCCSESS_MAIL_SENT.getMessage() + " with Link: " + confirmUrl);
    }
}
