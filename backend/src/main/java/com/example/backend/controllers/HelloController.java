package com.example.backend.controllers;

import com.example.backend.models.HelloEntity;
import com.example.backend.services.HelloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/hello")
@CrossOrigin
public class HelloController {

    @Autowired
    private HelloService helloService;

    @GetMapping("/")
    public ResponseEntity<List<HelloEntity>> loadAllHelloEntities() {
        List<HelloEntity> hellos = helloService.loadAllHelloEntities();
        return ResponseEntity.ok(hellos);
    }
}
