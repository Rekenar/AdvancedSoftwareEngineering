package com.example.backend.services;

import com.example.backend.models.HelloEntity;
import com.example.backend.repositories.HelloRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
public class HelloService {

    @Autowired
    private HelloRepo helloRepo;

    public List<HelloEntity> loadAllHelloEntities(){
        return helloRepo.findAll();
    }

    public HelloEntity loadEntityById(Long id) throws Exception {
        Optional<HelloEntity> helloEntityOptional = helloRepo.findById(id);
        helloEntityOptional.orElseThrow(Exception::new);
        return helloEntityOptional.get();
    }
}
