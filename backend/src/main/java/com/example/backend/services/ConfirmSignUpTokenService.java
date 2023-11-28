package com.example.backend.services;
import com.example.backend.models.ConfirmSignUpTokenEntity;
import com.example.backend.models.UserEntity;
import com.example.backend.repositories.ConfirmSignUpTokenRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import java.util.Calendar;
import java.util.Date;
import java.util.Optional;

@Service
public class ConfirmSignUpTokenService {
    // token is 3 hours valid
    @Value("${SIGN_UP_TOKEN_EXPIRY_IN_HOURS}")
    private int EXPIRATION;

    @Autowired
    private ConfirmSignUpTokenRepo confirmSignUpTokenRepo;


    public boolean validateConfirmPasswordToken(String token) throws Exception {
        System.out.println("In validateConfirmPasswordToken: " + token);
        final Calendar cal = Calendar.getInstance();
        Optional<ConfirmSignUpTokenEntity> entity = confirmSignUpTokenRepo.findByToken(token);
        entity.orElseThrow(Exception::new); //PasswordResetTokenNotFoundException

        return cal.getTime().before(entity.get().getExpiryDate());
    }

    @Transactional
    public void createConfirmSignUpTokenForUser(UserEntity user, String token) {
        ConfirmSignUpTokenEntity confirmSignUpTokenEntity = new ConfirmSignUpTokenEntity();
        confirmSignUpTokenEntity.setToken(token);
        confirmSignUpTokenEntity.setUser(user);

        // token is 3 hours valid
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.HOUR_OF_DAY, EXPIRATION);

        confirmSignUpTokenEntity.setExpiryDate(calendar.getTime());

        confirmSignUpTokenRepo.save(confirmSignUpTokenEntity);
    }

    @Transactional
    public void deleteConfirmSignUpToken(String token) throws Exception {
        Optional<ConfirmSignUpTokenEntity> confirmRegistrationTokenEntity = confirmSignUpTokenRepo.findByToken(token);
        confirmRegistrationTokenEntity.orElseThrow(Exception::new); // ConfirmRegistrationTokenNotFound
        confirmSignUpTokenRepo.delete(confirmRegistrationTokenEntity.get());
    }

    public UserEntity loadUserByConfirmSignUpToken(String token) throws Exception {
        Optional<ConfirmSignUpTokenEntity> confirmRegistrationTokenEntity = confirmSignUpTokenRepo.findByToken(token);
        confirmRegistrationTokenEntity.orElseThrow(Exception::new); // PasswordResetTokenNotFoundException

        return confirmRegistrationTokenEntity.get().getUser();
    }
}
