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
          console.log('');
            if(res) { 
                // console.log(res); //loop of all names of all departments
                for (const object of res) { //object is current iteration of loop
                    // each item in the res array is an object
                    console.log(object.name)
                }
                console.log('');
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
          console.log('');
            if(res) { 
                for (const object of res) { //object is current iteration of loop
                    // each item in the res array is an object
                    console.log(object.title)
                }
                console.log('');
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
              console.log('');
                for (const object of res) { //object is current iteration of loop
                    // each item in the res array is an object
                    console.log(object.first_name, object.last_name);
                }
                console.log('');
                // ask user prompts
                Prompts();
            }
            else{ 
                console.log(err);
            }
        }
    )
}

const addDepartment = () => { // adding a new department
    return inquirer.prompt([
        {
            type: "input",
            name: "addDept",
            message: "Add a department.",
            }    
            
         ]).then((res) => {
            const addData = `INSERT INTO departments (name) VALUES ('${res.addDept}')`; //inserting department name as template literal
            db.query(addData);
            Prompts(); // will go back to prompts.
          });
      }

const addRole = () => { //Add more to this
    return inquirer.prompt([
        {
            type: "input",
            name: "addRole",
            message: "Add a role.",
        }  
            
        ]).then((res) => {
            const addData = `INSERT INTO roles (name) VALUES ('${res.addRole}')`;
            db.query(addData);
            Prompts();
        });
      }

const addEmployee = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "addEmployee",
            message: "Add an employee.",
        }    
            
        ]).then((res) => {
            const addData = `INSERT INTO employees (name) VALUES ('${res.addEmployee}')`;
            db.query(addData)
            Prompts();
        });
      }

const updateRole = () => { //Doesnt work
  inquirer.prompt({
    name: "employeeName",
    type: "input",
    message: "Enter employee name",

  }).then((employeeName) => { //Split into 2 parts for first_name & last_name
    console.log(employeeName.employeeName);
    let name = employeeName.employeeName.split(" ");   // splits the name on a space
    const firstName = name[0]
    const lastName = name[1]
    console.log(name)
    console.log(firstName, lastName)

    // Prompt user for new role
    inquirer.prompt({
      name: "roleName",
      type: "input",
      message: "Enter new role ID",
      
    }).then((roleName) => {
      console.log(roleName.roleName);
      const roleId = `SELECT id FROM roles WHERE title = ${roleName.roleName}`;
      db.query(roleId)

      // capture the id of the desired role (1, 2, 3). this will be stored in a variable

      //take this variable and run the following Query
      //UPDATE employees SET role_id={my new role id} WHERE first_name=${first_name} AND last_name=${last_name}
    })

  });
}