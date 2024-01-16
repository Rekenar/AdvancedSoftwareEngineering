package com.example.backend.mail.listeners;

import com.example.backend.Exceptions.MailNotSentException;
import com.example.backend.controllers.UserController;
import com.example.backend.mail.DefaultEmailService;
import com.example.backend.mail.MailEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
public class MailListener implements ApplicationListener<MailEvent> {

    @Autowired
    DefaultEmailService mailService;

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @Override
    public void onApplicationEvent(MailEvent mailEvent) {
        try {
            mailService.sendMessageUsingThymeleafTemplate(mailEvent.getTo(), mailEvent.getSubject(), mailEvent.getTemplateModel(), mailEvent.getPath());
        } catch (MailNotSentException e) {
            LOGGER.error("\"" +mailEvent.getSubject() + "\" Mail was not send to user: " + mailEvent.getTo(), e);
        }
    }
}
