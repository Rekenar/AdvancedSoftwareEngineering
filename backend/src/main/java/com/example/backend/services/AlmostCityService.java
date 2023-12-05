package com.example.backend.services;

import com.example.backend.models.HelloEntity;
import com.example.backend.repositories.AlmostGameRepo;
import com.example.backend.repositories.HelloRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlmostGameService {

    @Autowired
    private AlmostGameRepo almostGameRepo;

    public List<HelloEntity> loadAllHelloEntities(){
        return almostGameRepo.findAll();
    }
    
}
