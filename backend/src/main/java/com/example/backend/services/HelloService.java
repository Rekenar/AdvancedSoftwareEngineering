package com.example.backend.services;

import com.example.backend.models.HelloEntity;
import com.example.backend.repositories.HelloRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HelloService {

    @Autowired
    private HelloRepo helloRepo;

    public List<HelloEntity> loadAllHelloEntities(){
        return helloRepo.findAll();
    }
}
