const inquirer = require("inquirer");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Daisy*4socobr",
    database: "emplopyee_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});

function start() {
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        choices: ["Add a Department", "Add a role", "Add an employee", "View Department", "View Roles", "View employees", "Update employee role", "Exit"],
        name: "action"
    }).then(function (action) {
        if (action.action === "Add a Department") {
            addDepartment()
        }
        else if (action.action === "Add a role") {
            addRole()
        }
        else if (action.action === "Add an employee") {
            addEmployee()
        }
        else if (action.action === "View Department") {
            viewDepartment()
        }
        else if (action.action === "View Roles") {
            viewRoles()
        }
        else if (action.action === "View employees") {
            viewEmployees()
        }
        else if (action.action === "Update employee role") {
            updateEmployee()
        }
        else if (action.action === "Exit") {
            connection.end();
        }
    })
};

function addDepartment() {
    inquirer.prompt({
        type: "input",
        message: "New Department name?",
        name: "newDepartment"
    })
        .then(function (answer) {
            connection.query("INSERT INTO department (name) VALUES (?)", [answer.newDepartment], function (err, res) {
                if (err) throw err;
                console.log("Department added!");
                start();
            })
        })
};

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "New Role name?",
            name: "title"
        },
        {
            type: "input",
            message: "Role Salary?",
            name: "salary"
        }
    ])
        .then(function (answer) {
            connection.query("INSERT INTO role (title, salary) VALUES (?, ?)", [answer.title, answer.salary], function (err, res) {
                if (err) throw err;
                console.log("Role added!");
                start();
            })
        })
};

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "First name?",
            name: "firstName"
        },
        {
            type: "input",
            message: "Last Name?",
            name: "lastName"
        },
    ])
        .then(function (answer) {
            connection.query("INSERT INTO employee (first_name, last_name) VALUES (?, ?)", [answer.firstName, answer.lastName], function (err, res) {
                if (err) throw err;
                console.log("Role added!");
                start();
            })
        })
};

function viewDepartment() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
};

function viewRoles() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
};

function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
};

function updateEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "First name of employee you would like to update?",
            name: "firstName"
        },
        {
            type: "list",
            message: "What would you like to update?",
            choices: ["First name", "Last name", "Role id"],
            name: "choice"
        },
        {
            type: "input",
            message: "What would you like to update it to?",
            name: "update"
        }
    ])
        .then(function (answer) {
            const name = answer.firstName
            if (answer.choice === "First name") {
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What is their First Name?",
                        name: "update"
                    }
                ])
                .then(function(response){
                    connection.query("UPDATE employee SET ? WHERE ?",
                    [
                        {
                            first_name: response.update
                        },
                        {
                            first_name: name
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;
                        console.log("Updated First Name!");
                        start();
                    }
                )
                })
                
            }
            else if (answer.choice === "Last name") {
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What is their Last Name?",
                        name: "update"
                    }
                ])
                .then(function(response){
                    connection.query("UPDATE employee SET ? WHERE ?",
                    [
                        {
                            last_name: response.update
                        },
                        {
                            first_name: name
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;
                        console.log("Updated last name!");
                        start();
                    }
                )
                })
            }
            else if (answer.choice === "Role id") {
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What is their new role id?",
                        name: "update"
                    }
                ])
                .then(function(response){
                    connection.query("UPDATE employee SET ? WHERE ?",
                    [
                        {
                            role_id: response.update
                        },
                        {
                            first_name: name
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;
                        console.log("Updated role!");
                        start();
                    }
                )
                })
            }
        })
};