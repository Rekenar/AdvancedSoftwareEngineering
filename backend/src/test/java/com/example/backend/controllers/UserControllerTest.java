package com.example.backend.controllers;

import com.example.backend.Exceptions.MailNotSentException;
import com.example.backend.TestHelper;
import com.example.backend.dtos.PasswordDTO;
import com.example.backend.dtos.SignUpSuccessDTO;
import com.example.backend.dtos.UserDetailsDTO;
import com.example.backend.dtos.UsernameDTO;
import com.example.backend.mail.DefaultEmailService;
import com.example.backend.messages.SuccessMessages;
import com.example.backend.models.UserEntity;
import com.example.backend.repositories.UserRepo;
import com.example.backend.security.jwt.JwtUtil;
import com.example.backend.security.models.AuthenticationRequest;
import com.example.backend.services.ConfirmSignUpTokenService;
import com.example.backend.services.PasswordResetService;
import com.example.backend.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthenticationManager authenticationManager;

    @MockBean
    private JwtUtil jwtUtil;

    @MockBean
    private UserService userService;

    @MockBean
    private ConfirmSignUpTokenService confirmSignUpTokenService;

    @MockBean
    private DefaultEmailService defaultEmailService; // to prevent the Mails to be actually sent

    @MockBean
    private PasswordResetService passwordResetService;

    @MockBean
    private UserRepo userRepo;

    @Value("${FRONTEND_URL}")
    private String frontendUrl;

    private static final String LOGIN_API = "/api/users/login";
    private static final String REGISTER_API = "/api/users/register";
    private static final String PASSWORD_RESET_API = "/api/users/reset-password";
// ... other constants ...


    UserDetailsDTO defaultUserDetails;

    UserEntity userEntity;


    @BeforeEach
    void setUp() throws MailNotSentException {
        defaultUserDetails = TestHelper.createMockUserDto();
        userEntity = TestHelper.createUserEntity();

        when(userService.loadUserByUsername(anyString())).thenReturn(defaultUserDetails);

        // Mock for registration Mails
        when(defaultEmailService.sendHtmlMessage(anyString(), anyString(), anyString()))
                .thenReturn("Email sent successfully");

        when(defaultEmailService.sendMessageUsingThymeleafTemplate(anyString(), anyString(), anyMap(), anyString()))
                .thenReturn("Email sent successfully");
    }

    /*
    // this should be handeled by SpringBoot
    @AfterEach
    void tearDown() {
    }*/

    @Test
    public void whenLoginSuccessfulThenReturnJwt() throws Exception {
        AuthenticationRequest request = new AuthenticationRequest("user@user.at", "user1234");
        String expectedToken = "token";
        when(jwtUtil.generateToken(any(UserDetailsDTO.class))).thenReturn(expectedToken);

        mockMvc.perform(post(LOGIN_API)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.jwt").value(expectedToken));
    }

    @Test
    public void whenLoginFailsThenReturnUnauthorized() throws Exception {
        AuthenticationRequest request = new AuthenticationRequest("testuser@user.at", "user1234");
        when(authenticationManager.authenticate(any())).thenThrow(BadCredentialsException.class);

        mockMvc.perform(post(LOGIN_API)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(request)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void whenUserIsNotEnabledThenReceiveBadRequest() throws Exception {
        AuthenticationRequest request = new AuthenticationRequest("disabledUser@user.at", "user1234");
        UserDetailsDTO disabledUserDetails = new UserDetailsDTO();
        disabledUserDetails.setEnabled(false);
        disabledUserDetails.setUsername("disabledUser@user.at");
        disabledUserDetails.setPassword("user1234");

        when(userService.loadUserByUsername("disabledUser@user.at")).thenReturn(disabledUserDetails);
        when(authenticationManager.authenticate(any())).thenReturn(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        mockMvc.perform(post(LOGIN_API)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("User not enabled"));
    }

    @Test
    public void whenAuthenticationFailsThenReceiveUnauthorizedResponse() throws Exception {
        AuthenticationRequest request = new AuthenticationRequest("wrongUser@user.at", "wrongPassword");

        when(authenticationManager.authenticate(any()))
                .thenThrow(new BadCredentialsException("Incorrect username or password"));

        mockMvc.perform(post(LOGIN_API)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string("Incorrect username or password"));
    }

    @Test
    public void whenRegisterUserSuccessfullyThenReceiveSignUpSuccessDTO() throws Exception {
        UserDetailsDTO mockUserDto = TestHelper.createMockUserDto();
        UserEntity mockUserEntity = TestHelper.createUserEntity();

        String mockToken = UUID.randomUUID().toString();
        String confirmUrl = frontendUrl + "users/register?token=" + mockToken;

        when(userService.createUser(any(UserDetailsDTO.class))).thenReturn(mockUserEntity);
        when(confirmSignUpTokenService.getSignupTokenSuccessBody(anyString()))
                .thenReturn(new SignUpSuccessDTO("Confirmation E-Mail sent successfully.", confirmUrl));


        mockMvc.perform(post(REGISTER_API)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(mockUserDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.confirmSignupToken").value(confirmUrl))
                .andExpect(jsonPath("$.message").value("Confirmation E-Mail sent successfully."));
    }

    @Test
    public void whenConfirmRegistrationSuccessfulThenReceiveSuccessMessage() throws Exception {
        String mockToken = "mockToken";

        UserEntity mockUserEntity = TestHelper.createUserEntity();
        mockUserEntity.setUsername("dummyUser@example.com");
        mockUserEntity.setPassword("dummyPassword");

        // Mock the behavior of the token service
        when(confirmSignUpTokenService.validateConfirmPasswordToken(mockToken)).thenReturn(true);
        when(confirmSignUpTokenService.loadUserByConfirmSignUpToken(mockToken)).thenReturn(mockUserEntity);

        mockMvc.perform(put(REGISTER_API)
                        .param("token", mockToken))
                .andExpect(status().isOk())
                .andExpect(content().string(SuccessMessages.REGISTRATION_SUCCSESS_MAIL_SENT.getMessage()));
    }

    @Test
    public void whenResetPasswordThenSendPasswordResetLink() throws Exception {
        UsernameDTO usernameDTO = new UsernameDTO();
        usernameDTO.setUsername("testuser@user.at");

        UserEntity mockUserEntity = TestHelper.createUserEntity();

        when(userService.loadUserEntityByUsername(anyString())).thenReturn(mockUserEntity);
        doNothing().when(passwordResetService).setPasswordResetToken(any(UserEntity.class), anyString());

        mockMvc.perform(post(PASSWORD_RESET_API)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(usernameDTO)))
                .andExpect(status().isOk())
                .andExpect(content().string(SuccessMessages.PASSWORD_RESET_LINK_SENT.getMessage()));
    }

    @Test
    public void whenTokenIsValidThenPasswordUpdateSuccess() throws Exception {
        String validToken = "validToken";
        String validNewPassword = "validNewPassword";

        PasswordDTO passwordDTO = new PasswordDTO();
        passwordDTO.setToken(validToken);
        passwordDTO.setNewPassword(validNewPassword);

        UserEntity mockUserEntity = TestHelper.createUserEntity();

        when(passwordResetService.validatePasswordResetToken(validToken)).thenReturn(true);
        when(passwordResetService.loadUserByPasswordResetToken(validToken)).thenReturn(mockUserEntity);
        doNothing().when(passwordResetService).changePassword(any(UserEntity.class), anyString());
        doNothing().when(passwordResetService).deletePasswordResetTokenByToken(validToken);

        mockMvc.perform(put(PASSWORD_RESET_API)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(passwordDTO)))
                .andExpect(status().isOk())
                .andExpect(content().string(SuccessMessages.PASSWORD_UPDATE_SUCCESSFUL.getMessage()));
    }
}