const db = require("../config/db");
const { v4: uuid } = require("uuid");

// Create department
exports.createDepartment = (req, res) => {
  const { name } = req.body;
  const hash_id = uuid(); // Generate unique hash_id for department

  const query = `INSERT INTO departments (name, hash_id) VALUES (?, ?)`;

  db.query(query, [name, hash_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res
      .status(201)
      .json({ message: "Department created", department_id: result.insertId });
  });
};

// Get all departments
exports.getDepartments = (req, res) => {
  const query = "SELECT * FROM departments";

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ departments: result });
  });
};

// Get By Id departments

exports.getByIdDepartment = (req, res) => {
  const departmentId = req.params.id;

  const query = "SELECT * FROM departments WHERE id= ?";

  db.query(query, [departmentId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(200).json({ departments: result });
  });
};

// delete department

exports.deleteDeparment = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM departments WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Department deleted successfully" });
  });
};

// Update department
// exports.updateDepartment = (req, res) => {
//   const {id,name} = req.body;
//   const query = `UPDATE departments SET name = ? WHERE id = ?`;

//   db.query(query, [id,name], (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.status(200).json({ message: "Department updated successfully" });
//   });
// };


exports.updateDepartment = (req, res) => {
  const { name, id } = req.body;

  // Validate input
  if (!name || !id) {
    return res.status(400).json({ error: "Name and ID are required" });
  }

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID must be a number" });
  }

  const query = `UPDATE departments SET name = ? WHERE id = ?`;

  db.query(query, [name, parseInt(id)], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Department not found" });
    }

    res.status(200).json({ message: "Department updated successfully" });
  });
};
