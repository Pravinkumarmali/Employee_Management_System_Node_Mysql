const db = require("../config/db");

// Get All Employees With Department

exports.GetAllEmpWithDept = (req, res) => {
  const query = `
       SELECT 
           employees.id AS employee_id,
           employees.name AS employee_name,
           employees.email,
           employees.phone,
           employees.city,
           employees.created_at,
           departments.id AS department_id,
           departments.name AS department_name
       FROM employees
       INNER JOIN departments ON employees.department_id = departments.id
     `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.length === 0) {
      console.log("No data found.");
    }

    res.json({ employees: result });
  });
};

// Get All Department with their employees.

exports.GetAllDeptWithEmp = (req, res) => {
  const query = `
      SELECT 
    departments.id AS department_id,
    departments.name AS department_name,
    employees.id AS employee_id,
    employees.name AS employee_name,
    employees.email
FROM departments
LEFT JOIN employees ON employees.department_id = departments.id
    `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

  
    if (result.length === 0) {
      console.log("No data found.");
    }

    res.json({ department: result });
  });
};

// Get Employees in a Specific Department

exports.GetEmpWithDept = (req, res) => {
  const departmentName = req.params.departmentName;
  const query = `SELECT 
    employees.id AS employee_id,
    employees.name AS employee_name,
    employees.email,
    employees.phone,
    employees.city
FROM employees
INNER JOIN departments ON employees.department_id = departments.id
WHERE departments.name = ?; 

`;

  db.query(query, [departmentName], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database Error", error: err });
    }
    res.json({ employees: result });
  });
};

// Get Department in a Specific Employees

exports.GetDeptWithEmp = (req, res) => {
  const employeeName = req.params.employeeName;
  const query = `SELECT 
            departments.id AS department_id,
            departments.name AS department_name,
            employees.id AS employee_id,
            employees.name AS employee_name,
            employees.email,
            employees.phone,
            employees.city
        FROM departments
        INNER JOIN employees ON employees.department_id = departments.id
        WHERE employees.name = ?;
`;

  db.query(query, [employeeName], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database Error", error: err });
    }
    res.json({ employees: result });
  });
};

