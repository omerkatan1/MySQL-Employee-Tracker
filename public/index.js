const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

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
        type: 'list',
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
    promptQuit();

}

function searchEmployee_Department() {
    console.log('test');
    promptQuit();

}

function searchEmployee_Role() {
    console.log('test');
    promptQuit();

}

function addEmployee() {
    console.log('test');
    promptQuit();

}

function removeEmployee() {
    console.log('test');
    promptQuit();

}

function addDepartment() {
    inquirer.prompt({
        type: "input",
        name: "addDepartment",
        message: "What is the name of your department?"

    }).then(function(answer) {
        
        connection.query('INSERT INTO department SET ?', { department_name: answer.addDepartment }, function(err) {
            if (err) throw err;
        });

        console.log("\n Department added to database... \n");

        promptQuit();
    });
}

function addRole() {

    connection.query("SELECT * FROM department", function(err, result) {
        if (err) throw err;
        console.log(result);

        inquirer.prompt([
            {
                name: "roleTitle",
                type: "input",
                message: "Enter the title for this role"
            },
            {
                name: "roleSalary",
                type: "input",
                message: "Enter the salary for this role"
            },
            {
                name: "departmentChoice",
                type: "rawlist",
                message: "Choose a department associated with this role",
                choices: function() {
                    var arrChoices = [];

                    for(var i = 0; i < result.length; i++) {
                        arrChoices.push(result[i].department_name);
                    }

                    return arrChoices;
                }
            }
        ])

    })

    promptQuit();

}

function promptQuit() {
    inquirer.prompt({
        type: "list",
        name: "promptQuit",
        message: "Would you like to quit this application or run again?",
        choices: ["Run Again", "Quit"]
    }).then(function(answer) {

        if(answer.promptQuit === "Run Again") {
            runApp();
        } else {
            connection.end();
        }


    });
}