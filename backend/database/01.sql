CREATE DATABASE IF NOT EXISTS `minigameshub_mysql_db`;
GRANT ALL ON `minigameshub_mysql_db`.* TO 'user'@'%';
GRANT ALL ON `minigameshub_mysql_db`.* TO 'root'@'%';

START TRANSACTION;

CREATE TABLE almost_game_capitals (
    id SERIAL PRIMARY KEY,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    city VARCHAR(255)
    -- capital BOOLEAN
);

INSERT INTO almost_game_capitals (id,latitude, longitude, city)
VALUES
    (1,41.33,19.82,'Tirana'),
    (2,42.51,1.52,'Andorra la Vella'),
    (3,48.21,16.37,'Vienna'),
    (4,53.9,27.57,'Minsk'),
    (5,50.85,4.35,'Brussels'),
    (6,43.85,18.36,'Sarajevo'),
    (7,42.7,23.32,'Sofia'),
    (8,45.81,15.98,'Zagreb'),
    (9,35.17,33.37,'Nicosia'),
    (10,50.09,14.42,'Prague'),
    (11,55.68,12.57,'Copenhagen'),
    (12,59.44,24.75,'Tallinn'),
    (14,60.17,24.94,'Helsinki'),
    (15,48.85,2.35,'Paris'),
    (16,52.52,13.41,'Berlin'),
    (17,36.14,-5.35,'Gibraltar'),
    (18,37.98,23.72,'Athens'),
    (19,49.46,-2.54,'St Peter Port'),
    (20,47.5,19.04,'Budapest'),
    (21,64.14,-21.9,'Reykjavik'),
    (22,53.33,-6.25,'Dublin'),
    (23,54.15,-4.48,'Douglas'),
    (24,41.89,12.48,'Rome'),
    (25,49.19,-2.1,'Saint Helier'),
    (26,42.67,21.17,'Pristina'),
    (27,56.95,24.11,'Riga'),
    (28,47.14,9.52,'Vaduz'),
    (29,54.69,25.28,'Vilnius'),
    (30,49.61,6.13,'Luxembourg'),
    (31,42,21.43,'Skopje'),
    (32,35.9,14.51,'Valletta'),
    (33,47.01,28.86,'Chisinau'),
    (34,43.73,7.42,'Monaco'),
    (35,42.44,19.26,'Podgorica'),
    (36,52.37,4.89,'Amsterdam'),
    (37,59.91,10.75,'Oslo'),
    (38,52.23,21.01,'Warsaw'),
    (39,38.72,-9.13,'Lisbon'),
    (40,44.43,26.11,'Bucharest'),
    (41,55.75,37.62,'Moscow'),
    (42,43.94,12.45,'San Marino'),
    (43,44.8,20.47,'Belgrade'),
    (44,48.15,17.11,'Bratislava'),
    (45,46.05,14.51,'Ljubljana'),
    (46,40.42,-3.7,'Madrid'),
    (47,78.22,15.64,'Longyearbyen'),
    (48,59.33,18.06,'Stockholm'),
    (49,46.95,7.45,'Bern'),
    (50,50.45,30.52,'Kiev'),
    (51,51.51,-0.13,'London'),
    (52,41.9,12.45,'Vatican');
COMMIT;
