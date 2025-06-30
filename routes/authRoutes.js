const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const router = express.Router();

// User login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log("-- login----");
    
    const query = 'SELECT * FROM employees WHERE email = ?';
    
    db.query(query, [email], (err, result) => {
        if (err || result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = result[0];
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    });
});

module.exports = router;
