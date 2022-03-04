const db = require('./db/connection');
const inquirer = require('inquirer');
const dbFunctions = require('./assets/dbFunctions');

const Prompts = () => {

  return inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "Please choose one of the following:",
      choices: [
        {
          name: "View all departments",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "View all roles",
          value: "VIEW_ROLES"
        },
        {
          name: "View all employees",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "Add a department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "Add a role",
          value: "ADD_ROLE"
        },
        {
          name: "Add an employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Update a role",
          value: "UPDATE_ROLE"
        },
        {
          name: "Exit",
          value: "EXIT"
        }
      ]
    }
  ]).then(res => {
    let choice = res.choice;

    //call a function depending on user choice
    switch (choice) {
      case "VIEW_DEPARTMENTS":
        dbFunctions.viewDepartments();
        break;
      case "VIEW_ROLES":
        dbFunctions.viewRoles();
        break;
      case "VIEW_EMPLOYEES":
        dbFunctions.viewEmployees();
        break;
      case "ADD_DEPARTMENT":
        dbFunctions.addDepartment();
        break;
      case "ADD_ROLE":
        dbFunctions.addRole();
        break;
      case "ADD_EMPLOYEE":
        dbFunctions.addEmployee();
        break;
    //   case "UPDATE_ROLE":
    //     updateRole();
    //     break;
    //   case "EXIT":
           // close database connection and exit program
    //     db.close()
    //     break;
     }
    }
  )}

  db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    Prompts(); 
  });


const testFunc = () => {
  console.log('this is a test function') //tests that module.exports is working
}

  module.exports = {
    Prompts:Prompts,
    testFunc: testFunc
  }