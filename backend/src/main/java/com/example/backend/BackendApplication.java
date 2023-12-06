package com.example.backend;

import org.hibernate.engine.jdbc.connections.spi.JdbcConnectionAccess;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.JdbcConnectionDetails;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    // debug docker compose behaviour
    @Bean
    CommandLineRunner commandLineRunner(JdbcConnectionDetails jdbc) {
        return args -> {
            System.out.println(jdbc.getJdbcUrl());
        };
    }
}
