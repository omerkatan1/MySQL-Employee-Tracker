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
                searchEmployee()
                break;

            case "Search Employee by Department":
                searchEmployee_Department()
                break;
            
            case "Search Employee by Role":
                searchEmployee_Role()
                break;

            case "Add Employee":
                addEmployee()
                break;

            case "Remove Employee":
                removeEmployee()
                break;

            case "Add Department":
                addDepartment()
                break;

            case "Add Role":
                addRole()
                break;
        }
    });
}

function searchEmployee() {

}

function searchEmployee_Department() {

}

function searchEmployee_Role() {

}

function addEmployee() {

}

function removeEmployee() {

}

function addDepartment() {
    inquirer.prompt({

    }).then(departmentAnswer => {
        console.log('Adding Department...\n');

        var query = "INSERT INTO department SET ?";
        connection.query(query, { departmentAnswer }, function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " department inserted.");
            runApp();
        });
    });

    console.log(query.sql);
}

function addRole() {

}
