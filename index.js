const mysql = require("mysql");
require('console.table');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: "localhost",

    // Your port;
    port: 3306,

    // Your username
    user: "root",

    password: "",
    database: "employeesDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
});

function start() {
    inquirer
        .prompt([{
            type: "list",
            message: "What would you like to do?",
            name: "start",
            choices: [
                "Add Employee",
                "View all Employees",
                "Remove Employee",
                "Add Department",
                "View all Departments",
                "Add Roles",
                "View all Roles",
                "Update Employee Role",
                "Exit"
            ]
        }])
        .then(function(res) {
            switch (res.start) {

                case "View all Employees":
                    viewAllEmployees();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Remove Employee":
                    removeEmployee();
                    break;

                case "Add Department":
                    addDept();
                    break;

                case "View all Departments":
                    viewAllDept();
                    break;

                case "Add Roles":
                    addRole();
                    break;

                case "View all Roles":
                    viewAllRoles();
                    break;

                case "Update Employee Role":
                    updateEmRole();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        })
}

function viewAllEmployees() {

    connection.query("SELECT employee.first_name, employee.last_name, role.title AS role, manager.first_name AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN employee manager ON employee.manager_id = manager.id GROUP BY employee.id",
        function(err, res) {
            if (err) throw err;

            console.table(res);
            console.log(connection.query)
            start();
        });
}

function addEmployee() {
    console.log("Inserting a new employee");
    inquirer
        .prompt([{
                type: "input",
                message: "First Name?",
                name: "first_name",
            },
            {
                type: "input",
                message: "Last Name?",
                name: "last_name"
            },
            {
                type: "list",
                message: "What is the employee's role?",
                name: "role_id",
                choices: [1, 2, 3]
            },
            {
                type: "input",
                message: "Who is their manager? use a manager ID ",
                name: "manager_id"
            }
        ])
        .then(function(res) {
            const query = connection.query(
                "INSERT INTO employee SET ?",
                res,
                function(err, res) {
                    if (err) throw err;
                    console.log("Employee added");

                    start();
                }
            );
        })
}

function removeEmployee() {
    let employeeList = [];
    connection.query(
        "SELECT employee.first_name, employee.last_name FROM employee", (err, res) => {
            for (let i = 0; i < res.length; i++) {
                employeeList.push(res[i].first_name + " " + res[i].last_name);
            }
            inquirer
                .prompt([{
                    type: "list",
                    message: "Which employee would you like to delete?",
                    name: "employee",
                    choices: employeeList

                }, ])
                .then(function(res) {
                    const query = connection.query(
                        `DELETE FROM employee WHERE concat(first_name, ' ' ,last_name) = '${res.employee}'`,
                        function(err, res) {
                            if (err) throw err;
                            console.log("Employee deleted");
                            start();
                        });
                });
        }
    );
};

function viewAllDept() {
    connection.query("SELECT * FROM department", function(err, res) {
        console.table(res);
        start();
    })
}

function addDept() {
    inquirer
        .prompt([{
            type: "input",
            name: "departmentName",
            message: "What Department would you like to add?"
        }])
        .then(function(res) {
            console.log(res);
            const query = connection.query(
                "INSERT INTO department SET ?", {
                    name: res.departmentName
                },
                function(err, res) {
                    connection.query("SELECT * FROM department", function(err, res) {
                        console.table(res);
                        start();
                    })
                }
            )
        })
}


function addRole() {
    let departments = [];
    connection.query("SELECT * FROM department",
        function(err, res) {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                res[i].first_name + " " + res[i].last_name
                departments.push({ name: res[i].name, value: res[i].id });
            }
            inquirer
                .prompt([{
                        type: "input",
                        name: "title",
                        message: "What role would you like to add?"
                    },
                    {
                        type: "input",
                        name: "salary",
                        message: "What is the salary for the role?"
                    },
                    {
                        type: "list",
                        name: "department",
                        message: "what department?",
                        choices: departments
                    }
                ])
                .then(function(res) {
                    console.log(res);
                    const query = connection.query(
                        "INSERT INTO role SET ?", {
                            title: res.title,
                            salary: res.salary,
                            department_id: res.department
                        },
                        function(err, res) {
                            if (err) throw err;

                            start();
                        }
                    )
                })
        })
}

function viewAllRoles() {
    connection.query("SELECT role.*, department.name FROM role LEFT JOIN department ON department.id = role.department_id", function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}


function updateEmRole() {
    inquirer
        .prompt([{
                type: "input",
                name: "employeeName",
                message: "Which employee's role would you like to update? select by writing first name"

            },
            {
                type: "input",
                name: "role",
                message: "What is your new role?"
            }
        ])
        .then(function(res) {
            connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [res.role, res.employeeName],
                function(err, res) {
                    console.log(res);
                    console.log(err);

                    start();
                }
            );
        })
}