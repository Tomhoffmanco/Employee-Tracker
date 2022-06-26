DROP TABLE IF EXISTS employees
CREATE DATABASE employees;

use employees;


CREATE TABLE department (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL UNSIGNED NOT NULL,
    department_id INT UNSIGNED NOT NULL, 
    INDEX dep_ind (department_id),
    CONSTRAINT fk_deparment FOREIGN KEY (department_id) REGERENCES department(id) ON DELETE CASCADE

)

CREATE TABLE employees (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        role_id INT UNSIGNED NOT NULL,
        index role_ind (role_id),
        CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE, 
        manager_id INT UNSIGNED,
        INDEX MAN_IND (manager_id),
        CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL 
);

