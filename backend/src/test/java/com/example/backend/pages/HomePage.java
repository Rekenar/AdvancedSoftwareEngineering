package com.example.backend.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;

import java.util.List;

public class HomePage {
    private WebDriver driver;

    @FindBy(how = How.CLASS_NAME, using = "btnGame1")
    public WebElement game1Button;

    public HomePage(WebDriver driver) {
        this.driver = driver;
    }

    public void clickGame1Button(){
        game1Button.click();
    }

    public void printAllElements(){
        // Find all elements with a specific tag name (e.g., 'a' for links)
        List<WebElement> allElements = driver.findElements(By.tagName("button"));

        // Print information about each element
        for (WebElement element : allElements) {
            System.out.println("Tag Name: " + element.getTagName());
            System.out.println("Text: " + element.getText());
            System.out.println("----------------------");
        }
    }




}
