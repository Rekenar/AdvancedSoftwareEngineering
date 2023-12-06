CREATE DATABASE IF NOT EXISTS `minigameshub_mysql_db`;
GRANT ALL ON `minigameshub_mysql_db`.* TO 'user'@'%';
GRANT ALL ON `minigameshub_mysql_db`.* TO 'root'@'%';

CREATE TABLE IF NOT EXISTS almost_game_capitals (
    id SERIAL PRIMARY KEY,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    city VARCHAR(255)
    -- capital BOOLEAN
);

INSERT INTO almost_game_capitals (latitude, longitude, city)
VALUES
	(42.51,1.52,'Andorra la Vella'),
    (48.21,16.37,'Vienna'),
    (53.9,27.57,'Minsk'),
    (50.85,4.35,'Brussels'),
    (43.85,18.36,'Sarajevo'),
    (42.7,23.32,'Sofia'),
    (45.81,15.98,'Zagreb'),
    (35.17,33.37,'Nicosia'),
    (50.09,14.42,'Prague'),
    (55.68,12.57,'Copenhagen'),
    (59.44,24.75,'Tallinn'),
    (60.17,24.94,'Helsinki'),
    (48.85,2.35,'Paris'),
    (52.52,13.41,'Berlin'),
    (36.14,-5.35,'Gibraltar'),
    (37.98,23.72,'Athens'),
    (49.46,-2.54,'St Peter Port'),
    (47.5,19.04,'Budapest'),
    (64.14,-21.9,'Reykjavi­k'),
    (53.33,-6.25,'Dublin'),
    (54.15,-4.48,'Douglas'),
    (41.89,12.48,'Rome'),
    (49.19,-2.1,'Saint Helier'),
    (42.67,21.17,'Pristina'),
    (56.95,24.11,'Riga'),
    (47.14,9.52,'Vaduz'),
    (54.69,25.28,'Vilnius'),
    (49.61,6.13,'Luxembourg'),
    (42,21.43,'Skopje'),
    (35.9,14.51,'Valletta'),
    (47.01,28.86,'Chisinau'),
    (43.73,7.42,'Monaco'),
    (42.44,19.26,'Podgorica'),
    (52.37,4.89,'Amsterdam'),
    (59.91,10.75,'Oslo'),
    (52.23,21.01,'Warsaw'),
    (38.72,-9.13,'Lisbon'),
    (44.43,26.11,'Bucharest'),
    (55.75,37.62,'Moscow'),
    (43.94,12.45,'San Marino'),
    (44.8,20.47,'Belgrade'),
    (48.15,17.11,'Bratislava'),
    (46.05,14.51,'Ljubljana'),
    (40.42,-3.7,'Madrid'),
    (59.33,18.06,'Stockholm'),
    (46.95,7.45,'Berne'),
    (50.45,30.52,'Kiev'),
    (51.51,-0.13,'London'),
    (41.9,12.45,'Vatican');
