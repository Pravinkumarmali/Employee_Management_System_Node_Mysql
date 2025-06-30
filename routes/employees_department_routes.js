const express = require("express");
const employees_department = require("../controllers/employees_department")
const authenticateToken = require("../middlewares/auth");
const router = express.Router();

router.get('/abc', authenticateToken, employees_department.GetAllEmpWithDept);
router.get('/getdata/all', authenticateToken, employees_department.GetAllDeptWithEmp);
router.get('/employees-by-department/:departmentName', authenticateToken, employees_department.GetEmpWithDept);
router.get('/department-by-employees/:employeeName', authenticateToken, employees_department.GetDeptWithEmp);



module.exports = router;