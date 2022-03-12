const db = require('./db/connection');
const inquirer = require('inquirer');
require("console.table");

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
        viewDepartments();
        break;
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "ADD_DEPARTMENT":
        addDepartment();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      case "ADD_EMPLOYEE":
        addEmployee();
        break;
      case "UPDATE_ROLE":
        updateRole();
        break;
      case "EXIT":
          //  close database connection and exit program
        db.close();
        break;
     }
    }
  )
}
  db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    Prompts(); 
  });

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
                Prompts();
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
                Prompts();
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
                Prompts();
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
          }).then(Prompts());
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
          }).then(Prompts());
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
            }).then(Prompts());
        }

const updateRole = () => { //Doesnt work
    const selectEmployees = 'SELECT * FROM employees';
    db.query(selectEmployees, (err, res) => {
      if(err){console.error(err)}
      if(res){console.table(res)}

    const selectRoles = 'SELECT * FROM roles';
    db.query(selectRoles, (err, res) => {
      if(err){console.error(err)}
      if(res){console.table(res)}

    return inquirer.prompt([
        {
          type: "input",
          message: "Which employee like to update?",
          name: "employeeUpdate"
        },
        {
          type: "input",
          message: "What is their new role ID number?",
          name: "roleUpdate"
        }
    ]).then((res) => {
        const dataUpdate = `UPDATE employees SET role_id = ${res.updateRole} WHERE id = ${res.employeeUpdate}`;
        db.query(dataUpdate);
        }).then(Prompts());
    })
})
}