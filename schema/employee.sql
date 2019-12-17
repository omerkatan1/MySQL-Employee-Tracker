DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;


CREATE TABLE employee (
    employee_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role_id INTEGER(10) NOT NULL,
    manager_id INTEGER(50) NOT NULL,
    PRIMARY KEY(employee_id)

);

CREATE TABLE employee_role (
	role_id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(role_id)
);

CREATE TABLE employee_department(
	department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(200) NOT NULL,
    PRIMARY KEY(department_id)
);

SELECT * FROM employee_db;