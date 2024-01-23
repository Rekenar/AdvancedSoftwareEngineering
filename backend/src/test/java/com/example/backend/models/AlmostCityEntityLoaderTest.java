package com.example.backend.models;

import com.example.backend.repositories.AlmostCityRepo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.CommandLineRunner;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@RunWith(MockitoJUnitRunner.class)
class AlmostCityEntityLoaderTest {
    @Mock
    private AlmostCityRepo almostCityRepo;
    @Spy
    @InjectMocks
    private AlmostCityEntityLoader almostCityLoader;

    @Test
    public void testRunWhenDataExists() throws Exception {
        when(almostCityRepo.count()).thenReturn(1L);

        almostCityLoader.run();

        verify(almostCityRepo).count();
        verify(almostCityLoader, never()).loadData();
    }

    @Test
    public void testRunWhenNoData() throws Exception {
        when(almostCityRepo.count()).thenReturn(0L);
        doNothing().when(almostCityLoader).loadData();

        almostCityLoader.run();

        verify(almostCityRepo).count();
        verify(almostCityLoader).loadData();
    }
}