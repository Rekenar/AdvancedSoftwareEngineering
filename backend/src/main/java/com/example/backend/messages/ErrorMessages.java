package com.example.backend.messages;

public enum ErrorMessages {

    PASSWORD_RESET_TOKEN_NOT_FOUND("Password reset token not found!", "PASSWORD_RESET_TOKEN_NOT_FOUND");


    private final String message;
    private final String code;

    ErrorMessages(String errorMessage, String errorCode) {
        this.message = errorMessage;
        this.code = errorCode;
    }

    public String getMessage() {
        return message;
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
