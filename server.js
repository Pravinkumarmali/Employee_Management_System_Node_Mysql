const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const authRoutes = require('./routes/authRoutes');
const employees_department_routes = require('./routes/employees_department_routes');

dotenv.config();

const app = express();
const bodyParser = require("body-parser");


// Enable CORS for all routes
app.use(cors());

// OR, enable CORS with specific options
// app.use(cors({
//     origin: 'http://example.com', // Replace with the origin(s) you want to allow
//     methods: ['GET', 'POST'], // Replace with the HTTP methods you want to allow
//     allowedHeaders: ['Content-Type', 'Authorization'], // Replace with the headers you want to allow
// }));

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST','PATCH','DELETE' ],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use(bodyParser.json());
// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/auth', authRoutes);
//
app.use('/api/emp-dep',employees_department_routes);
app.use('/api/dep-emp',employees_department_routes);
app.use('/api/employee',employees_department_routes);

// Server listening
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
