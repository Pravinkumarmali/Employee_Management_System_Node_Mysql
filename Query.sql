-- (2) Table:- employees

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hash_id VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    city VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    department_id INT,  -- Foreign key referring to the department
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL 
);







-- solution:- hamene yaha par foreign key me department ki "id" ko liya hai but department ka table to bana hi nahi hai so pahle deparment ka table banana hoga.



-- (1) Table: departments

CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hash_id VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL UNIQUE
);
