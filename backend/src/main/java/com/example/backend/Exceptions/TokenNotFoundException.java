package com.example.backend.Exceptions;

import com.example.backend.messages.ErrorMessages;

public class TokenNotFoundException extends RuntimeException {
    public TokenNotFoundException(String exception) {
        super(ErrorMessages.getMessageByCode(exception));
    }
}
