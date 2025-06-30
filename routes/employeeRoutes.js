const express = require('express');
const employeeController = require('../controllers/employeeController');
const authenticateToken = require('../middlewares/auth');
const router = express.Router();

// CRUD operations for employees

router.post('/',  employeeController.createEmployee);
router.get('/', authenticateToken, employeeController.getEmployees);
router.get('/:id', authenticateToken, employeeController.getByIdEmployee); //
router.patch('/:id', authenticateToken, employeeController.updateEmployee);
router.delete('/:id', authenticateToken, employeeController.deleteEmployee);

module.exports = router;

