CREATE DATABASE hotel_management;
USE hotel_management;
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(15),
    password VARCHAR(100)
);

CREATE TABLE hotels (
hotel_id INT PRIMARY KEY AUTO_INCREMENT,
hotel_name VARCHAR(100),
location VARCHAR(100),
rooms_available INT,
parking_available boolean
);

CREATE TABLE rooms(
room_id  INT PRIMARY KEY AUTO_INCREMENT,
user_id INT,
hotel_id INT,
room_type VARCHAR(100),
room_availability boolean,
available_from date,
available_to date,
room_service boolean,
FOREIGN KEY (hotel_id) REFERENCES hotels(hotel_id),
FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE bookings(
booking_id INT PRIMARY KEY AUTO_INCREMENT,
room_id  INT,
user_id INT,
hotel_id INT,
booking_status boolean,
FOREIGN KEY (hotel_id) REFERENCES hotels(hotel_id),
FOREIGN KEY (user_id) REFERENCES users(user_id),
FOREIGN KEY (room_id) REFERENCES rooms(room_id)
);

SHOW TABLES;
