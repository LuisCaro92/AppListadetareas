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
    tarea_id INT,
    user_id INT,
    shared_with_id INT,
    FOREIGN KEY (tarea_id) REFERENCES tareas(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (shared_with_id) REFERENCES users(id) ON DELETE CASCADE,
);

--INSERTANDO USUARIOS FALSOS

INSERT INTO users (name, email, password) VALUES  ('Luis', 'luis1@example.com', '123456789');
INSERT INTO users (name, email, password) VALUES  ('Valentin', 'vale@example.com', '123456789');