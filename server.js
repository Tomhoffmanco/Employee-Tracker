// dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const { clear } = require("console");
var figlet = require("figlet");

figlet("Employee \n Tracker!", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,
  user: "root",
  password: "Kronwall55",
  database: "employee_tracker_db",
});

const start = () => {
  inquirer
    .prompt({
      name: "chooseAction",
      type: "list",
      message:
        "WELCOME to your employee tracking system! Would you like to [VIEW], [ADD], or [UPDATE] a department, role, or employee?",
      choices: ["VIEW", "ADD", "UPDATE", "END"],
    })
    .then((response) => {
      //VIEW Selection
      if (response.chooseAction === "VIEW") {
        inquirer
          .prompt({
            name: "chooseView",
            type: "list",
            message: "What would you like to view?",
            choices: ["Departments", "Roles", "Employees"],
          })
          .then((response) => {
            //View Depts
            if (response.chooseView === "Departments") {
              connection.query("SELECT * FROM department", (err, res) => {
                if (err) throw err;
                console.table(res);
                start();
              });
            }

            //View Roles
            if (response.chooseView === "Roles") {
              connection.query("SELECT * FROM role", (err, res) => {
                if (err) throw err;
                console.table(res);
                start();
              });
            }

            //View Eployees
            if (response.chooseView === "Employees") {
              connection.query("SELECT * FROM employee", (err, res) => {
                if (err) throw err;
                console.table(res);
                start();
              });
            }
          });
      }

      //Employee chooses to ADD something
      if (response.chooseAction === "ADD") {
        inquirer
          .prompt({
            name: "chooseAdd",
            type: "list",
            message: "What would you like to add to?",
            choices: ["Departments", "Roles", "Employees"],
          })
          .then((response) => {
            //Chooses to add Departments

            if (response.chooseAdd === "Departments") {
              inquirer
                .prompt({
                  type: "input",
                  message: "Please enter the department name",
                  name: "deptName",
                })
                .then((response) => {
                  connection.query(
                    `INSERT INTO department (name) VALUE (?)`,
                    [response.deptName],
                    (err, res) => {
                      if (err) throw err;
                      connection.query(
                        "SELECT * FROM department",
                        (err, res) => {
                          if (err) throw err;
                          console.table(res);
                          start();
                        }
                      );
                    }
                  );
                });
            }

            //Choose to add roles
            if (response.chooseAdd === "Roles") {
              inquirer
                .prompt([
                  {
                    type: "input",
                    message: "Please enter new the roles's title.",
                    name: "roleTitle",
                  },
                  {
                    type: "input",
                    message: "Please enter the role's salary.",
                    name: "roleSalary",
                  },
                  {
                    type: "list",
                    message: "Please enter the roles's department ID.",
                    name: "roleId",
                    choices: [1, 2, 3, 4, 5, 6, 7],
                  },
                ])
                .then((response) => {
                  connection.query(
                    "INSERT INTO role ( title, salary, department_id) VALUE (?,?,?)",
                    [response.roleTitle, response.roleSalary, response.roleId],
                    (err, res) => {
                      if (err) throw err;
                      console.table(res);
                      connection.query("SELECT * from role", (err, res) => {
                        if (err) throw err;
                        console.table(res);
                        start();
                      });
                    }
                  );
                });
            }
            //Choose to add employees
            if (response.chooseAdd === "Employees") {
              inquirer
                .prompt([
                  {
                    type: "input",
                    message: "What is your employee'ss first name?",
                    name: "firstName",
                  },
                  {
                    type: "input",
                    message: "What is your employee'ss last name?",
                    name: "lastName",
                  },
                  {
                    type: "input",
                    message: "What is your employee'ss role ID?",
                    name: "employeeRoleId",
                  },
                  {
                    type: "input",
                    message: "What is your employee's manager ID",
                    name: "employeeManagerId",
                  },
                ])
                .then((response) => {
                  connection.query(
                    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE (?,?,?,?)",
                    [
                      response.firstName,
                      response.lastName,
                      response.employeeRoleId,
                      response.employeeManagerId,
                    ],
                    (err, res) => {
                      if (err) throw err;
                      console.table(res);
                      connection.query("SELECT * FROM employee", (err, res) => {
                        if (err) throw err;
                        console.table(res);
                        start();
                      });
                    }
                  );
                });
            }
          });
      }

      //Choose UPDATE
      if (response.chooseAction === "UPDATE") {
        inquirer
          .prompt([
            {
              name: "chooseUpdate",
              type: "list",
              message: "What would you like to update?",
              choices: ["Departments", "Roles", "Employees"],
            },
          ])
          .then((response) => {
            //Choose to update Departments
            if (response.chooseUpdate === "Departments") {
              inquirer
                .prompt([
                  {
                    type: "list",
                    message: "What department name would you like to update?",
                    choices: ["Sales", "Legal", "Finance", "Engineering"],
                    name: "chooseDepartment",
                  },
                  {
                    type: "input",
                    message: "Please enter the desired update.",
                    name: "enterDeptChange",
                  },
                ])
                .then((response) => {
                  connection.query(
                    "UPDATE department SET name = ? WHERE name = ?",
                    [response.enterDeptChange, response.chooseDepartment],
                    (err, res) => {
                      if (err) throw err;
                      console.log("Update successful!");
                    }
                  );

                  connection.query("SELECT * from department", (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    start();
                  });
                });
            }

            //Choose to update Roles
            if (response.chooseUpdate === "Roles") {
              connection.query("SELECT * FROM role", (err, res) => {
                if (err) throw err;
                console.table(res);
              });

              inquirer
                .prompt([
                  {
                    type: "input",
                    message: "What role title would you like to update?",
                    name: "chooseRoleTitle",
                  },
                  {
                    type: "input",
                    message: "What is the role ID you would like to update?",
                    name: "chooseRoleId",
                  },
                  {
                    type: "input",
                    message: "Please enter the updated role title",
                    name: "enterRoleTitle",
                  },
                  {
                    type: "input",
                    message: "Please enter the updated role salary",
                    name: "enterRoleSalary",
                  },
                ])
                .then((response) => {
                  connection.query("SELECT * from role", (err, res) => {
                    if (err) throw err;
                    console.table(res);
                  });

                  connection.query(
                    "UPDATE role SET title = ?, salary = ? WHERE id = ?",
                    [
                      response.enterRoleTitle,
                      response.enterRoleSalary,
                      response.chooseRoleId,
                    ]
                  );

                  connection.query("SELECT * from role", (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    start();
                  });
                });
            }

            // choose to update Employees

            if (response.chooseUpdate === "Employees") {
              connection.query("SELECT * FROM employee", (err, res) => {
                if (err) throw err;
                console.table(res);
              });

              inquirer
                .prompt([
                  {
                    type: "input",
                    message:
                      "What is the selected ID of the employee you wish to update",
                    name: "chooseEmployeeID",
                  },
                  {
                    type: "input",
                    message:
                      "What is the new role ID you would like to update?",
                    name: "chooseEmployeeRoleId",
                  },
                ])
                .then((respone) => {
                  connection.query("SELECT * FROM employee", (err, res) => {
                    if (err) throw err;
                    console.table(res);
                  });

                  connection.query(
                    "UPDATE employee SET role_id = ? WHERE id = ?",
                    [respone.chooseEmployeeRoleid, respone.chooseEmployeeid]
                  );

                  connection.query("SELECT * FROM employee", (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    start();
                  });
                });
            }
          });
      }

      if (response.chooseAction === "END") {
        connection.end();
      }
    });
};

connection.connect((err) => {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});
