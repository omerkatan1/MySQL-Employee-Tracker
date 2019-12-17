const mysql = require('mysql');
const inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "omer171015415",
    database: "employee_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    runApp();
});

function runApp() {
    inquirer.prompt({
        name: 'startQuestions',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: ['Search an Employee', 'Search Employee by Department', 'Search Employee by Role', 'Add Employee', 'Remove Employee', 'Add Department', 'Add Role', 'quit']
    }).then(function(answer) {
        switch (answer.startQuestions) {
            case "Search an Employee":
                searchEmployee();
                break;

            case "Search Employee by Department":
                searchEmployee_Department();
                break;
            
            case "Search Employee by Role":
                searchEmployee_Role();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Remove Employee":
                removeEmployee();
                break;

            case "Add Department":
                addDepartment();
                break;

            case "Add Role":
                addRole();
                break;
            case "quit":
                connection.end();
                break;
        }
    });
}

function searchEmployee() {
    console.log('test');
    runApp();

}

function searchEmployee_Department() {
    console.log('test');
    runApp();

}

function searchEmployee_Role() {
    console.log('test');
    runApp();

}

function addEmployee() {
    console.log('test');
    runApp();

}

function removeEmployee() {
    console.log('test');
    runApp();

}

function addDepartment() {
    inquirer.prompt({
        type: "input",
        name: "addDepartment",
        message: "What is the name of your department?"

    }).then(function(answer) {
        
        connection.query('INSERT INTO department SET ?', { department_name: answer.addDepartment }, function(err) {
            if (err) throw err;
            runApp();
        });
    });

}

function addRole() {
    console.log('test');
    runApp();

}