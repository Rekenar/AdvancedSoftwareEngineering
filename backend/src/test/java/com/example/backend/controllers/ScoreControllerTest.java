package com.example.backend.controllers;


import com.example.backend.enums.Game;
import com.example.backend.services.ScoreService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;

import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;


import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class ScoreControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ScoreService scoreService;

    @InjectMocks
    private ScoreController scoreController;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup( scoreController ).build();
    }


    @Test
    public void getAllScores_ReturnsScoreList()
            throws Exception {
        given( scoreService.getAllScores() ).willReturn( Collections.emptyList() );

        mockMvc.perform( get( "/scores/all" ) )
                .andExpect( status().isOk() )
                .andExpect( content().contentType( MediaType.APPLICATION_JSON ) );
    }


    @ParameterizedTest
    @EnumSource(Game.class)
    public void addScore_ErrorInAdd_ReturnsBadRequest(Game game)
            throws Exception {
        String notValidGame = game.getDisplayName() + "notValidGame";
        Integer scoreValue = 100;

        assertThrows( IllegalArgumentException.class, () -> {
            scoreService.createScore( "", Game.valueOf( notValidGame ), scoreValue );
        } );

        mockMvc.perform( post( "/scores/add/{game}/{scoreValue}", 10, scoreValue ) )
                .andExpect( status().isBadRequest() );
    }
}
