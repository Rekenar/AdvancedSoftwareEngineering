package com.example.backend.services;

import com.example.backend.dtos.AsteroidOutgoingDTO;
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


                Integer x = (int) (Math.random() * width);
                Integer y = (int) (Math.random() * height);

                Pair<Integer, Integer> point = calculatePoint(x, y, middle, boundary);

                double angle = (Math.random() * -Math.PI * 2);

                double speed = (Math.random() * 1) + 1;

                int size = (int) (Math.random() * 3);

                asteroids.add(new Asteroid(point.getFirst(), point.getSecond(), angle, speed, size));
            }
            return new AsteroidOutgoingDTO(null, asteroids);
        } catch (Exception e) {
            return new AsteroidOutgoingDTO(e.getLocalizedMessage());
        }

    }

    private Pair<Integer, Integer> calculatePoint(Integer x, Integer y, Pair<Integer, Integer> middle, Pair<Integer, Integer> boundary) {
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
