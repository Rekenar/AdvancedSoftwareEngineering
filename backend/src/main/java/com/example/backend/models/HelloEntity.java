package com.example.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;

@Entity
@Table(name = "hello")
public class HelloEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id", unique = true, nullable = false)
    private Long id;

    @Email(message = "must be valid e-mail")
    @Column(name = "username", unique = true, nullable = false)
    private String username;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
