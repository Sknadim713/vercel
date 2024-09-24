// routes/employee.js
const express = require('express');
const router = express.Router();
const Employee = require('../models/employee_model');
const fs = require('fs')
const path = require('path');

// const filePath = path.join(__dirname, '../public/file/demo.json');
// result = fs.readFileSync(filePath, 'utf-8')
// console.log(result);

// Create a new employee
router.post('/add', async (req, res) => {
  const { name, position, department } = req.body;

  try {
    const employee = new Employee({ name, position, department });
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all employees
router.get('/all', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
