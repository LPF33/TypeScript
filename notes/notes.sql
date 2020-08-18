DROP TABLE IF EXISTS notes;

CREATE TABLE notes(
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description VARCHAR(250) NOT NULL,
    status BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

INSERT INTO notes (name, description, status) VALUES ('Einkauf','Bananen','false');
INSERT INTO notes (name, description, status) VALUES ('Einkauf','Schoko','false');