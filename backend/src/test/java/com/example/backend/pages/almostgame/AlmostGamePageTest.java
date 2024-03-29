package com.example.backend.pages.almostgame;

import com.example.backend.pages.HomePage;
import com.example.backend.pages.login.LoginPage;
import com.example.backend.repositories.UserRepo;
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
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Duration;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class AlmostGamePageTest {

    @Qualifier("getChromeDriver")
    @Autowired
    private WebDriver driver;


    @Value("${FRONTEND_URL}")
    private String frontendUrl;

    private AlmostGameStartPage navigateToAlmostGameStart() {
        driver.get(frontendUrl + "login");

        LoginPage loginPage = PageFactory.initElements(driver, LoginPage.class);
        loginPage.performLoginAndCheckRedirect("user@user.at", "user1234", frontendUrl + "home");

        HomePage homePage = PageFactory.initElements(driver, HomePage.class);
        homePage.clickGame1Button();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("start-button")));
        AlmostGameStartPage startPage = PageFactory.initElements(driver, AlmostGameStartPage.class);

        return startPage;

    }
    private AlmostGameMapPage navigateFromStartToGame(AlmostGameStartPage almostGameStartPage){
        almostGameStartPage.clickStartButton();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement blankModeSelector = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//button/p[contains(., 'Blank mode')]")));
        blankModeSelector.click();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement capitalsSelector = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//button/p[contains(., 'Capitals are enough!')]")));

        capitalsSelector.click();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement map = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("map")));

        AlmostGameMapPage mapPage = PageFactory.initElements(driver, AlmostGameMapPage.class);

        return mapPage;

    }

    @Test
    public void navigateToAlmostGameTest() {
        try {
            // Navigate to the login page
            driver.get(frontendUrl + "login");

            LoginPage loginPage = PageFactory.initElements(driver, LoginPage.class);
            boolean isRedirected = loginPage.performLoginAndCheckRedirect("user@user.at", "user1234", frontendUrl + "home");

            assertTrue(isRedirected, "The user was not redirected to the home page after login.");

            HomePage homePage = PageFactory.initElements(driver, HomePage.class);
            //homePage.printAllElements();
            homePage.clickGame1Button();

            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            WebElement almostGameStartButton = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("start-button")));

            assertTrue(almostGameStartButton.isDisplayed(),"Clicking the Game1 button did not work.");

        } catch (Exception e) {
            e.printStackTrace();
            throw new AssertionError("Navigation to AlmostGame failed.");
        }
    }
    @Test
    public void clickAttributionsTest(){
        try {
            AlmostGameStartPage almostGameStartPage = navigateToAlmostGameStart();
            almostGameStartPage.clickAttrButton();

            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            WebElement attributions = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("attr-text")));
            assertTrue(attributions.isDisplayed(),"Attributions were not displayed.");

        }catch (Exception e) {
            e.printStackTrace();
            throw new AssertionError("Clicking the attributions button failed.");
        }
    }
    @Test
    public void clickStartTest(){
        try {
            AlmostGameStartPage almostGameStartPage = navigateToAlmostGameStart();
            almostGameStartPage.clickStartButton();

            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            WebElement blankModeSelector = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//button/p[contains(., 'Blank mode')]")));
            assertTrue(blankModeSelector.isDisplayed(),"Blank mode selector was not displayed.");

        }catch (Exception e) {
            e.printStackTrace();
            throw new AssertionError("Clicking the start button failed.");
        }

    }
    @Test
    public void navigateToGameTest(){
        try{
            AlmostGameStartPage almostGameStartPage = navigateToAlmostGameStart();
            almostGameStartPage.clickStartButton();

            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            WebElement blankModeSelector = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//button/p[contains(., 'Blank mode')]")));
            blankModeSelector.click();
            wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            WebElement capitalsSelector = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//button/p[contains(., 'Capitals are enough!')]")));
            assertTrue(capitalsSelector.isDisplayed(),"Capitals difficulty selector was not displayed.");

            capitalsSelector.click();
            wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            WebElement map = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("map")));
            assertTrue(map.isDisplayed(),"Map was not displayed.");

        }catch (Exception e) {
            e.printStackTrace();
            throw new AssertionError("Navigating to game from the start menu failed.");
        }
    }

    @Test
    public void quitClickTest(){
        try {
            AlmostGameStartPage almostGameStartPage = navigateToAlmostGameStart();
            AlmostGameMapPage almostGameMapPage = navigateFromStartToGame(almostGameStartPage);
            almostGameMapPage.clickQuitButton();

            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            WebElement almostGameStartButton = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("start-button")));

            assertTrue(almostGameStartButton.isDisplayed(),"Start button was not displayed.");

        }catch(Exception e) {
            e.printStackTrace();
            throw new AssertionError("Clicking the quit button failed.");
        }
    }


    @Test
    public void oneGamePlaythroughTest(){
        try {
            AlmostGameStartPage almostGameStartPage = navigateToAlmostGameStart();
            AlmostGameMapPage almostGameMapPage = navigateFromStartToGame(almostGameStartPage);
            String round = "Round: ";
            WebElement roundText = almostGameMapPage.roundText;
            WebElement statusButton = almostGameMapPage.statusButton;
            int cnt = 0;
            int rndCnt = 1;

            while(rndCnt != 11 || cnt == 20){
                System.out.println("Button enabled before click:" + statusButton.isEnabled());
                if(statusButton.isEnabled()){
                    almostGameMapPage.clickStatusButton();
                }

                String tmpRound = round + rndCnt;
                System.out.println("Desired: "+ tmpRound);
                System.out.println("Waiting for Round text to update " + roundText.getText());
                driver.manage().timeouts().implicitlyWait(Duration.ofMillis(200));

                if(roundText.getText().equals(tmpRound)){
                    System.out.println("Round text updated.");
                    rndCnt++;
                }else{
                    System.out.println("Round text not updated!");
                }

                almostGameMapPage.clickOnMap();
                driver.manage().timeouts().implicitlyWait(Duration.ofMillis(200));
                System.out.println("Waited for the button to be enabled.");

                cnt++;
            }

            assertEquals("Round: 0",almostGameMapPage.roundText.getText());
            assertEquals("Restart",almostGameMapPage.statusButton.getText());
            boolean containsGJ = almostGameMapPage.infoText.getText().contains("Good job");
            assertTrue(containsGJ);


        }catch(Exception e) {
            e.printStackTrace();
            throw new AssertionError("Almost Game playthrough failed.");
        }
    }


    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
