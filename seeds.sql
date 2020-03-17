USE employeesDB;

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 250000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 200000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Myres", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Cena", 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dwane", "The Rock Johnson", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("tim", "Brody", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Garbirel", "Iglesias", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Christian", "Bale", 1, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Sara", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Hanks", 4, 7);