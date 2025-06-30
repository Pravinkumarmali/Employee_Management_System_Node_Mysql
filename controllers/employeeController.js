const db = require("../config/db");
const bcrypt = require("bcryptjs");
const { v4: uuid } = require("uuid");

// Create employee
exports.createEmployee = (req, res) => {
  // console.log("--1--");
  
  const { name, email, phone, city, department_id, password } = req.body;
  // const hash_id = generateHash();  // Generate a unique hash_id for employee

  // UUID (Universally Unique Identifier) 
  const hash_id = uuid();
  const hashedPassword = bcrypt.hashSync(password, 10); // Encrypt password

  const query = `INSERT INTO employees (name, email, phone, city, password, department_id, hash_id)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [name, email, phone, city, hashedPassword, department_id, hash_id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res
        .status(201)
        .json({ message: "Employee created", employee_id: result.insertId });
    }
  );
};

// Get all employees
exports.getEmployees = (req, res) => {

  // console.log("--2--");

  const query = "SELECT * FROM employees";

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ employees: result });
  });
};

// Get employee By id
exports.getByIdEmployee = (req, res) => {
  console.log("--3--");

  const employeeId = req.params.id;

  const query = "select * FROM employees WHERE id = ? ";

  db.query(query, [employeeId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ employees: result });
  });
};

// Update employee
exports.updateEmployee = (req, res) => {
  console.log("--4--");

  const { id, name, email, phone, city, department_id } = req.body;
  const query = `UPDATE employees SET name = ?, email = ?, phone = ?, city = ?, department_id = ?, updated_at = NOW()
                   WHERE id = ?`;

  db.query(
    query,
    [name, email, phone, city, department_id, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: "Employee updated successfully" });
    }
  );
};

// Delete employee
exports.deleteEmployee = (req, res) => {
  console.log("--5--");

  const { id } = req.params;
  const query = "DELETE FROM employees WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  });
};
