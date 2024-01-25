package com.example.backend.controllers;

import com.example.backend.models.AlmostCityEntity;
import com.example.backend.services.AlmostCityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/almost")
@CrossOrigin
public class AlmostCityController {

    @Autowired
    private AlmostCityService almostCityService;

    private static final Logger logger = LoggerFactory.getLogger(AlmostCityController.class);


    @GetMapping("/cities")
    public ResponseEntity<List<AlmostCityEntity>> loadAlmostCityEntities() {
        List<AlmostCityEntity> cities = almostCityService.loadSampleCities();
        System.out.println(cities.size());
        if(cities.size() == 10){
            return ResponseEntity.ok(cities);
        }else{
            Exception e = new Exception("Length of cities is " + cities.size() +", but should be 10.");
            logger.error("Cities length error",e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(cities);
        }


    }

    @GetMapping("/capitals")
    public ResponseEntity<List<AlmostCityEntity>> loadAlmostCityCapitalEntities() {
            List<AlmostCityEntity> capitals = almostCityService.loadSampleCapitals();
            if(capitals.size() == 10){
                return ResponseEntity.ok(capitals);
            }else{
                Exception e = new Exception("Length of cities is " + capitals.size() +", but should be 10.");
                logger.error("Cities length error",e);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(capitals);
            }
    }

}
