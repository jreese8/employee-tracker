const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  findDepartments() {
    return this.connection.promise().query(
      "SELECT department.id, department.name FROM department;"
    );
  }

  findRoles() {
    return this.connection.promise().query(
      "SELECT role.id"
    )
  }

  findEmployees() {
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary;"
    );
  }

  addDepartment(department) {
    return this.connection.promise().query("INSERT INTO department SET ?", department);
  }

  addRole(role) {
    return this.connection.promise().query("INSERT INTO role SET ?", role);
  }

  addEmployee(employee) {
    return this.connection.promise().query("INSERT INTO SET ?", employee);
  }

}