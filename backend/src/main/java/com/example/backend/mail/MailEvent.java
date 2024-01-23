package com.example.backend.mail;

import org.springframework.context.ApplicationEvent;

import java.util.Map;

public class MailEvent extends ApplicationEvent {
    String to;
    String subject;
    Map<String, Object> templateModel;
    String path;

    public MailEvent(Object source, String to, String subject, Map<String, Object> templateModel, String path) {
        super(source);
        this.to = to;
        this.subject = subject;
        this.templateModel = templateModel;
        this.path = path;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public Map<String, Object> getTemplateModel() {
        return templateModel;
    }

    public void setTemplateModel(Map<String, Object> templateModel) {
        this.templateModel = templateModel;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
