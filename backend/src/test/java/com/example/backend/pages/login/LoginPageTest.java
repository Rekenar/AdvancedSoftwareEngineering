package com.example.backend.pages.login;

import com.example.backend.repositories.UserRepo;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class LoginPageTest {

    @Qualifier("getChromeDriver")
    @Autowired
    private WebDriver driver;

    @Value("${FRONTEND_URL}")
    private String frontendUrl;

    @Autowired
    UserRepo userRepo;

    @Autowired
    PasswordEncoder passwordEncoder;

    private LoginPage loginPage;

    @BeforeEach
    public void setUp() {
        driver.get(frontendUrl + "login");
        loginPage = PageFactory.initElements(driver, LoginPage.class);
    }

    @Test
    public void testLoginAndRedirectToHomeExpectSuccess() {
        boolean isRedirected = performLoginAndCheckRedirect("user@user.at", "user1234", frontendUrl + "home");
        assertTrue(isRedirected, "The user was not redirected to the home page after login.");
    }

    @Test
    public void testLoginWithIncorrectCredentialsExpectFailure() {
        boolean staysAtLoginPage = performLoginAndCheckRedirect("wrongUser", "wrongPassword", frontendUrl + "login");
        assertTrue(staysAtLoginPage, "The user was incorrectly redirected after entering wrong credentials.");
        assertErrorMessage("Incorrect username or password");
    }

    private boolean performLoginAndCheckRedirect(String username, String password, String expectedUrl) {
        return loginPage.performLoginAndCheckRedirect(username, password, expectedUrl);
    }

    private void assertErrorMessage(String expectedErrorMessage) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement errorMessageElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".error-message")));
        assertTrue(errorMessageElement.getText().contains(expectedErrorMessage), "The expected error message was not displayed.");
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
