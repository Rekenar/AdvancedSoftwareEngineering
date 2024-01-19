package com.example.backend.pages.login;

import org.junit.jupiter.api.AfterEach;
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

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class LoginPageTest {

    @Qualifier("getChromeDriver")
    @Autowired
    private WebDriver driver;


    @Value("${FRONTEND_URL}")
    private String frontendUrl;

    @Test
    public void testLoginAndRedirectToHomeExpectSuccess() {
        try {
            // Navigate to the login page
            driver.get(frontendUrl + "login");

            LoginPage loginPage = PageFactory.initElements(driver, LoginPage.class);
            boolean isRedirected = loginPage.performLoginAndCheckRedirect("user@user.at", "user1234", frontendUrl + "home");

            assertTrue(isRedirected, "The user was not redirected to the home page after login.");

        } catch (Exception e) {
            e.printStackTrace();
            throw new AssertionError("Login test failed.");
        }
    }

    @Test
    public void testLoginWithIncorrectCredentialsExpectFailure() {
        try {
            // Navigate to the login page
            driver.get(frontendUrl + "login");

            LoginPage loginPage = PageFactory.initElements(driver, LoginPage.class);
            loginPage.login("wrongUser", "wrongPassword");
            loginPage.clickLogin();

            // Wait for the error message to appear
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            WebElement errorMessageElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".error-message")));

            // Check if the error message is displayed and appropriate
            String expectedErrorMessage = "Incorrect username or password";
            String actualErrorMessage = errorMessageElement.getText();
            assertTrue(actualErrorMessage.contains(expectedErrorMessage), "The expected error message was not displayed.");

            // Check if the user is still on the login page
            String currentUrl = driver.getCurrentUrl();
            assertTrue(currentUrl.endsWith("/login"), "The user was incorrectly redirected after entering wrong credentials.");

        } catch (Exception e) {
            e.printStackTrace();
            throw new AssertionError("Login with incorrect credentials test failed.");
        }
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
    // trigger workflow
}