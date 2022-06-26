use employees;

INSERT INTO departments
    (name)
VALUES   
 
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');


INSERT INTO role
        (title, salary, department_id)

VALUES   
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 12500, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);



INSERT INTO  employee
        (first_name, last_name, role_id, manager_id

VALUES   
    ('John', 'DOE', 1, NULL),
    (' BRANDON', 'COX' 2, 1),
    ('Sara', 'Hill', 3, null),
    ('Ron', 'Burgandy', 4, 3),
    ('Will' 'Bean' 5, NULL),
    ('Jason', 'Spears', 6, 5),
    ('Mike', 'Hunt', 7, NULL),
    ('Phil', 'Mckracken', 8, 7),