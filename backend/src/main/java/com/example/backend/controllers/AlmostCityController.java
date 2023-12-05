package com.example.backend.controllers;

import com.example.backend.models.HelloEntity;
import com.example.backend.services.AlmostGameService;
import com.example.backend.services.HelloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/almost")
@CrossOrigin
public class AlmostGameController {

    @Autowired
    private AlmostGameService almostGameService;

    @GetMapping("/cities")
    public ResponseEntity<List<HelloEntity>> loadAllHelloEntities() {
        List<HelloEntity> hellos = almostGameService.loadAllHelloEntities();
        return ResponseEntity.ok(hellos);
    }

    @GetMapping("/capitals")
    public ResponseEntity<HelloEntity> loadHelloEntityById(@PathVariable Long id) throws Exception {
        HelloEntity hello = helloService.loadEntityById(id);
        return ResponseEntity.ok(hello);
    }
}
