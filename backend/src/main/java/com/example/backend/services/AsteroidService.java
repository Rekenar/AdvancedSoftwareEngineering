package com.example.backend.services;

import com.example.backend.dtos.AsteroidOutgoingDTO;
import com.example.backend.dtos.PowerUpDTO;
import com.example.backend.models.Asteroid;
import com.example.backend.models.PowerUp;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class AsteroidService {

    private final Logger logger = LoggerFactory.getLogger(AsteroidService.class);

    public AsteroidService() {

    }

    public AsteroidOutgoingDTO getAsteroidData(int width, int height) {
        try {
            if(width <= 0 || height <= 0) {
                throw new IllegalArgumentException("Width and height must be positive");
            }
            List<Asteroid> asteroids = new ArrayList<>(10);
            Pair<Integer, Integer> middle = Pair.of(width / 2, height / 2);

            Pair<Integer, Integer> boundary = Pair.of(width / 6, height / 6);


            for(int i = 0; i < 10; i++) {

                Pair<Integer, Integer> point = calculatePoint(width, height, middle, boundary);

                double angle = (Math.random() * -Math.PI * 2);

                double speed = (Math.random() * 1) + 1;

                int size = (int) (Math.random() * 3);

                asteroids.add(new Asteroid(point.getFirst(), point.getSecond(), angle, speed, size));
            }
            return new AsteroidOutgoingDTO(null, asteroids);
        } catch (Exception e) {
            return new AsteroidOutgoingDTO(e.getMessage());
        }
    }

    public PowerUpDTO getPowerUpData(int width, int height) {
        try {
            if(width <= 0 || height <= 0) {
                throw new IllegalArgumentException("Width and height must be positive");
            }
            List<PowerUp> powerUp = new ArrayList<>(20);
            Pair<Integer, Integer> middle = Pair.of(width / 2, height / 2);

            Pair<Integer, Integer> boundary = Pair.of(width / 6, height / 6);


            for(int i = 0; i < 2; i++) {
                Pair<Integer, Integer> point = calculatePoint(width, height, middle, boundary);

                int type = (int) (Math.random() * 5);

                powerUp.add(new PowerUp(point.getFirst(), point.getSecond(), type));
            }
            return new PowerUpDTO(null, powerUp);
        } catch (Exception e) {
            return new PowerUpDTO(e.getMessage());
        }
    }

    private Pair<Integer, Integer> calculatePoint(int width, int height, Pair<Integer, Integer> middle, Pair<Integer, Integer> boundary) {
        int x = (int) (Math.random() * width - 100);
        int y = (int) (Math.random() * height - 100);
        int boundaryLeftRight = boundary.getFirst();
        int boundaryTopBottom = boundary.getSecond();

        if((x > middle.getFirst() - boundaryLeftRight && x < middle.getFirst() + boundaryLeftRight) ||
                (y > middle.getSecond() - boundaryTopBottom && y < middle.getSecond() + boundaryTopBottom)) {
            if(y >= middle.getSecond()) {
                y += boundaryTopBottom;
            } else {
                y -= boundaryTopBottom;
            }

            if(x > middle.getFirst()) {
                x += boundaryLeftRight;
            } else {
                x -= boundaryLeftRight;
            }
        }
        return Pair.of(x, y);
    }

}
