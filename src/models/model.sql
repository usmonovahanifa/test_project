CREATE DATABASE users;

\c users

CREATE TABLE
    users (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(100),
        age INT,
        job VARCHAR(100)
    );

INSERT INTO
    users (full_name, age, job)
VALUES
    ('Usmonova Hanifa', 15, null);