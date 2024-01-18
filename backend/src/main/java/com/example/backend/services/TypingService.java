package com.example.backend.services;

import com.example.backend.models.TypingEntity;
import com.example.backend.repositories.TypingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TypingService {

    @Autowired
    private TypingRepo typingRepo;

    public List<TypingEntity> loadAllWords(){
        return typingRepo.findAll();
    }

    public Optional<TypingEntity> loadWordById(long id){
        return typingRepo.findById(id);
    }

}
