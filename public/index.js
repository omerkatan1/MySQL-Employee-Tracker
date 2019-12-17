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
        choices: ['Search an Employee', 'Search Employee by Department', 'Search Employee by Role', 'Add Employee', 'Remove Employee', 'Add Department', 'Add Role', 'Quit']
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
            case "Quit":
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

// searches employee by role
function searchEmployee_Role() {
    console.log('test');
    promptQuit();

}


// adds employee to database
function addEmployee() {
    
    connection.query("SELECT * FROM employee_role", function(err, result) {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "firstName",
                type: "input",
                message: "Enter the employee's First Name:"
            },
            {
                name: "lastName",
                type: "input",
                message: "Enter the employee's Last Name:"
            },
            {
                name: "roleChoice",
                type: "rawlist",
                message: "Enter the employee's role",
                choices: function() {
                    var arrChoices = [];

                    for(var i = 0; i < result.length; i++) {
                        arrChoices.push(result[i].title);
                    }

                    return arrChoices;
                }
            }
        ]).then(function(answer) {

            connection.query("SELECT * FROM employee_role WHERE ?", { title: answer.roleChoice }, function(err, result) {
                if (err) throw err;

                connection.query("INSERT INTO employee SET ?", {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: result[0].id
                });

                console.log("\n Employee added to database... \n");
            })

            promptQuit();
        });
    })
}

// removes employee from database
function removeEmployee() {
    console.log('test');
    promptQuit();

}


// adds department
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


// adds role
function addRole() {

    connection.query("SELECT * FROM department", function(err, result) {
        if (err) throw err;

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
        ]).then(function(answer) {

            connection.query("SELECT * FROM department WHERE ?", { department_name: answer.departmentChoice }, function(err, result) {
                if (err) throw err;
                console.log(result[0].id);

                connection.query("INSERT INTO employee_role SET ?", {
                    title: answer.roleTitle,
                    salary: parseInt(answer.roleSalary),
                    department_id: parseInt(result[0].id)
                });

                console.log("\n Role has been added to database... \n");
            })

            promptQuit();
        });

    })

}


// asks user if they want to quit or keep using the application
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