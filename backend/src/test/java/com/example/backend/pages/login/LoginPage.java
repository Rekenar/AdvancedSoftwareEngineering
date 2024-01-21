package com.example.backend.pages.login;

import com.example.backend.pages.HomePage;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class LoginPage {

    private WebDriver driver;

    @FindBy(how = How.CSS, using = "input[formControlName='username']")
    public WebElement txtUsername;

    @FindBy(how = How.CSS, using = "input[formControlName='password']")
    public WebElement txtPassword;

    @FindBy(how = How.CSS, using = ".btn-login")
    public WebElement btnLogin;

    @FindBy(how = How.LINK_TEXT, using = "Create one now!")
    public WebElement lnkRegister;

    @FindBy(how = How.LINK_TEXT, using = "Reset password")
    public WebElement lnkResetPassword;

    public void login(String username, String password){
        txtUsername.clear();
        txtUsername.sendKeys(username);
        txtPassword.clear();
        txtPassword.sendKeys(password);
        System.out.println("Username: " + username + " Password: " + password);
    }

    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }

    public HomePage clickLogin() {
        btnLogin.click();
        return new HomePage();
    }

    public boolean performLoginAndCheckRedirect(String username, String password, String expectedUrl) {
        login(username, password);
        clickLogin();
        return new WebDriverWait(driver, Duration.ofSeconds(10))
                .until(ExpectedConditions.urlToBe(expectedUrl));
    }
}