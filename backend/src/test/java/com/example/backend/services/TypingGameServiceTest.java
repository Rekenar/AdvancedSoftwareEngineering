package com.example.backend.services;

import com.example.backend.repositories.TypingRepo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class TypingGameServiceTest {

    @Mock
    private TypingRepo typingRepo;

    @InjectMocks
    private TypingService typingService;
    @Test
    void loadAllWords() {
        typingService.loadAllWords();
        verify(typingRepo, times(1)).findAll();
    }


}