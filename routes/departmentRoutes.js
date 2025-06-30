const express = require("express");
const departmentController = require("../controllers/departmentController");
const authenticateToken = require("../middlewares/auth");
const router = express.Router();

// CRUD operations for departments
// router.post("/", authenticateToken, departmentController.createDepartment);
router.post("/", departmentController.createDepartment); // use we i first time create department.
router.get("/", authenticateToken, departmentController.getDepartments);
router.get("/:id", authenticateToken, departmentController.getByIdDepartment);
router.patch("/:id", authenticateToken, departmentController.updateDepartment);
router.delete("/:id", authenticateToken, departmentController.deleteDeparment);

// router.get("/abc",authenticateToken, departmentController.GetDeptWithEmp);

module.exports = router;
