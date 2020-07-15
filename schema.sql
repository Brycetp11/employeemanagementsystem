DROP DATABASE IF EXISTS emplopyee_db;
CREATE database emplopyee_db;

USE emplopyee_db;

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2),
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

SELECT role.id, role.title, role.salary, employee.first_name, employee.last_name 
FROM role 
INNER JOIN employee 
ON employee.id = role.id;
