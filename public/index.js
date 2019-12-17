const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "omer171015415",
    database: "employee_db"
});

connection.connect(function(err) {
    if (err) throw err;

    runApp();
})

function runApp() {
    inquirer.prompt({
        name: 'startQuestions',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['Search an Employee', 'Search Employee by Department', 'Search Employee by Role', 'Add Employee', 'Remove Employee', 'Add Department', 'Add Role', ]
    }).then(answer => {
        switch (answer.action) {
            case "Search an Employee":
                break;

            case "Search Employee by Department":
                break;
            
            case "Search Employee by Role":
                break;

            case "Add Employee":
                break;

            case "Remove Employee":
                break;

            case "Add Department":
                break;

            case "Add Role":
                break;
        }
    });
}