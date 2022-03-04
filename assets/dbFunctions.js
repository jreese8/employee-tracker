const Prompts = require('../index');
const db = require('../db/connection');
const inquirer = require('inquirer');

const viewDepartments = () => {
    //Using database queries
    db.query(
        'SELECT * FROM departments', 
        (err,res) => {
            if(res) { 
                console.log(res); //loop of all names of all departments
                for (const object of res) { //object is current iteration of loop
                    // each item in the res array is an object
                    console.log(object.name)
                }
                // ask user prompts
                // START HERE
                Prompts.Prompts();
            }
            else{ 
                console.log(err);
            }
        }
    )
}

const viewRoles = () => {
    db.query(
        'SELECT * FROM roles', 
        (err,res) => {
            if(res) { 
                console.log(res); //loop of all names of all roles
                for (const object of res) { //object is current iteration of loop
                    // each item in the res array is an object
                    console.log(object.name)
                }
                // ask user prompts
                Prompts.Prompts();
            }
            else{ 
                console.log(err);
            }
        }
    )
}

const viewEmployees = () => {
    db.query(
        'SELECT * FROM employees', 
        (err,res) => {
            if(res) { 
                console.log(res); //loop of all names of all roles
                for (const object of res) { //object is current iteration of loop
                    // each item in the res array is an object
                    console.log(object.name)
                }
                // ask user prompts
                Prompts.Prompts();
            }
            else{ 
                console.log(err);
            }
        }
    )
}

const addDepartment = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "addDept",
            message: "Add a department.",
            validate: deptInput => {
                if (deptInput) {
                    return true;
                } else {
                    console.log ("Please add a department.");
                    return false; 
                }
              }
            }    
            
        ]).then((res) => {
            const addData = `INSERT INTO departments (name) VALUES ('${res.addDept}')`; //inserting department name as template literal
            db.query(addData);
            }).then //then go back to prompts
            Prompts.Prompts();
        }

        const addDepartment = () => {
            return inquirer.prompt([
                {
                    type: "input",
                    name: "addDept",
                    message: "Add a department.",
                    validate: deptInput => {
                        if (deptInput) {
                            return true;
                        } else {
                            console.log ("Please add a department.");
                            return false; 
                        }
                      }
                    }    
                    
                ]).then((res) => {
                    const mysql = `INSERT INTO departments (name) VALUES ('${res.addDept}')`; //inserting department name as template literal
                    db.query(mysql);
                    }).then //then go back to prompts
                    Prompts.Prompts();
                }

const addRole = () => { //Add more to this
    return inquirer.prompt([
        {
            type: "input",
            name: "addRole",
            message: "Add a role.",
            validate: roleInput => {
                if (roleInput) {
                    return true;
                } else {
                    console.log ("Please add a role.");
                    return false; 
                }
              }
            }    
            
        ]).then((res) => {
            const addData = `INSERT INTO roles (name) VALUES ('${res.addRole}')`;
            db.query(addData);
            }).then //then go back to prompts
            Prompts.Prompts();
        }

const addEmployee = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "addEmployee",
            message: "Add an employee.",
            validate: employeeInput => {
                if (employeeInput) {
                    return true;
                } else {
                    console.log ("Please add an employee.");
                    return false; 
                }
              }
            }    
            
        ]).then((res) => {
            const addData = `INSERT INTO employees (name) VALUES ('${res.addEmployee}')`;
            db.query(addData)
            }).then //then go back to prompts
            Prompts.Prompts();
        }


module.exports = {
    viewDepartments:viewDepartments,
    viewRoles:viewRoles,
    viewEmployees:viewEmployees,
    addDepartment:addDepartment,
    addRole:addRole,
    addEmployee:addEmployee
}