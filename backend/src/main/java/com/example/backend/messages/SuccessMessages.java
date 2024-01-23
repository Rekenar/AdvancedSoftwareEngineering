package com.example.backend.messages;

public enum SuccessMessages {
    CONFIRM_REGISTRATION_MAIL_SENT("Confirmation E-Mail sent successfully.", "CONFIRM_REGISTRATION_MAIL_SENT"),
    REGISTRATION_SUCCSESS_MAIL_SENT("Registration success E-Mail sent successfully.", "REGISTRATION_SUCCSESS_MAIL_SENT"),
    PASSWORD_RESET_LINK_SENT("Password reset Link sent successfully", "PASSWORD_RESET_LINK_SENT"),
    PASSWORD_UPDATE_SUCCESSFUL("Password updated successfully", "PASSWORD_UPDATE_SUCCESSFUL"),
    SEND_EMAIL_SUCCESS("Email sent successfully", "SEND_EMAIL_SUCCESS"),
    ;


    private final String message;
    private final String code;

    SuccessMessages(String successMessage, String successCode) {
        this.message = successMessage;
        this.code = successCode;
    }

    public String getMessage() {
        return "{ \"message\":\"" + message + "\"}";
    }
}
