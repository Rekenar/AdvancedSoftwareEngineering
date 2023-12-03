package com.example.backend.messages;

public enum ErrorMessages {

    CONFIRM_REGISTRATION_MAIL_SENT("Confirm Registration Token not exists!", "CONFIRM_REGISTRATION_TOKEN_NOT_EXISTS");


    private final String message;
    private final String code;

    ErrorMessages(String errorMessage, String errorCode) {
        this.message = errorMessage;
        this.code = errorCode;
    }

    public String getMessage() {
        return "{ \"message\":\"" + message + "\"}";
    }

    public String getCode() {
        return code;
    }

    public static String getMessageByCode(String code) {
        for (ErrorMessages errorMessage : ErrorMessages.values()) {
            if (errorMessage.getCode().equals(code)) {
                return errorMessage.getMessage();
            }
        }
        return "{ \"message\":\"Code not found.\"}";
    }
}
