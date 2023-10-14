CREATE DATABASE  tareas;

USE tareas;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(225),
    email VARCHAR(225) UNIQUE NOT NULL,
    password VARCHAR(225)
);

CREATE TABLE tareas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(225),
    completed BOOLEAN DEFAULT false,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE share_tareas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tareas_id INT,
    user_id INT,
    FOREIGN KEY (tareas_id) REFERENCES tareas(id),
    FOREIGN KEY (user_id) REFERENCES users(id) 
);