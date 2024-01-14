package com.example.backend.Exceptions;

public class MailNotSentException extends Throwable {
    public MailNotSentException(Exception e) {
        super(e);
    }
}
