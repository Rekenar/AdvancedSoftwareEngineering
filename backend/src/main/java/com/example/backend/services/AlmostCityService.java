package com.example.backend.services;

import com.example.backend.models.AlmostCityEntity;
import com.example.backend.repositories.AlmostCityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlmostCityService {

    @Autowired
    private AlmostCityRepo almostCityRepo;

    public List<AlmostCityEntity> loadSampleCities(){
        return almostCityRepo.sampleCities();
    }

    public List<AlmostCityEntity> loadSampleCapitals(){
        return almostCityRepo.sampleCapitals();
    }

}
