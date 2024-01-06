package com.example.backend.controllers;

import com.example.backend.models.AlmostCityEntity;
import com.example.backend.models.HelloEntity;
import com.example.backend.services.AlmostCityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/almost")
@CrossOrigin
public class AlmostCityController {

    @Autowired
    private AlmostCityService almostCityService;

    @GetMapping("/cities")
    public ResponseEntity<List<AlmostCityEntity>> loadAlmostCityEntities() {
        List<AlmostCityEntity> hellos = almostCityService.loadSampleCities();
        return ResponseEntity.ok(hellos);
    }

    @GetMapping("/capitals")
    public ResponseEntity<List<AlmostCityEntity>> loadAlmostCityCapitalEntities() {
        List<AlmostCityEntity> hellos = almostCityService.loadSampleCapitals();
        return ResponseEntity.ok(hellos);
    }

}
