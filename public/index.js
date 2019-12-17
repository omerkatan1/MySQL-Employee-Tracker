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

    connection.query("SELECT * FROM department", function(err, results) {
        if (err) throw err;
        console.log(results.length);


        inquirer.prompt([
            {
                name: "departmentChoice",
                type: "list",
                choices: function() {
                    var choiceArr = [];
                    for(var i = 0; i <= 2; i++) {
                        choiceArr.push(results[i].department_name);
                    }
                    return choiceArr;
                },
                message: "What is the department associated with this role?"
            },
            {
                name: "title",
                type: "input",
                message: "What is the name of the role?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary for this role?"
            }
        ]).then(function(answer) {
            
            connection.query("INSERT INTO employee_role SET ?", 
            [
                {
                    title: answer.title
                },
                {
                    salary: answer.salary
                }
            ]);

        }, function (err) {
            if (err) throw err;
            runApp();
        })
    
    })

    runApp();

}