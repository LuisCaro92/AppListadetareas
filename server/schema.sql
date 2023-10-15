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

CREATE TABLE shared_tareas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tarea_id INT,
    user_id INT,
    shared_with_id INT,
    FOREIGN KEY (tarea_id) REFERENCES tareas(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (shared_with_id) REFERENCES users(id) ON DELETE CASCADE
);

--INSERTANDO USUARIOS FALSOS

INSERT INTO users (name, email, password) VALUES  ('Luis', 'luis1@example.com', '123456789');
INSERT INTO users (name, email, password) VALUES  ('Valentin', 'vale@example.com', '123456789');

--Tareas predeterminadas--

INSERT INTO tareas (title, user_id)
VALUES
('Cocinar', 1),
('Dibujar', 1),
('Ordenar', 1),
('Descanzar', 1);

--Compartir tareas de usuario1 a usuario2--

INSERT INTO shared_tareas (tarea_id, user_id, shared_with_id)
VALUES (1, 1, 2);

--Get tareas incluyendo las tareas compartidas por id--

SELECT tareas.*, shared_tareas.shared_with_id
FROM tareas
LEFT JOIN shared_tareas ON tareas.id = shared_tareas.shared_with_id
WHERE tareas.user_id = 2 OR shared_tareas.shared_with_id = 2;