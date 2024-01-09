package com.example.backend.models;

import com.example.backend.repositories.AlmostCityRepo;
import com.example.backend.repositories.UserRepo;
import jakarta.persistence.*;
import org.apache.juli.logging.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Entity
@Table(name = "almost_game_capitals")
public class AlmostCityEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", unique = true, nullable = false)
    private Long id;

    @Column(name = "latitude", nullable = false)
    private Double latitude;

    @Column(name = "longitude", nullable = false)
    private Double longitude;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name="capital",nullable = false)
    private Boolean capital;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }
    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Boolean getCapital() {
        return capital;
    }

    public void setCapital(Boolean capital) {
        this.capital = capital;
    }
}

@Component
class AlmostCityEntityLoader implements CommandLineRunner {

    @Autowired
    AlmostCityRepo almostCityRepo;

    @Autowired
    private JdbcTemplate jdbcTemplate;
    /**
     *
     * creates default user with id=1, username=user@user.at, password=user1234
     */
    @Override
    public void run(String... args) throws IOException {
        if (almostCityRepo.count() == 0) {
            loadData();
        }else{
            System.out.println("Paris");
        }
    }

    private void loadData() throws IOException {
        Resource resource = new ClassPathResource("/cities.sql");
        byte[] bytes = FileCopyUtils.copyToByteArray(resource.getInputStream());
        String sqlStatements = new String(bytes, StandardCharsets.UTF_8);

        // Execute SQL statements
        jdbcTemplate.execute(sqlStatements);
    }
}
