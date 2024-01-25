package com.example.backend.pages.almostgame;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;

public class AlmostGameStartPage {

    private WebDriver driver;

    @FindBy(how = How.ID, using = "start-button")
    public WebElement startButton;

    @FindBy(how = How.ID, using = "attr-button")
    public WebElement attrButton;


    public AlmostGameStartPage(WebDriver driver) {
        this.driver = driver;
    }

    public void clickStartButton(){
        startButton.click();
    }

    public void clickAttrButton(){
        attrButton.click();
    }

}