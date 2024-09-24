// routes/staff.js
const express = require('express');
const router = express.Router();
const Staff = require('../models/staff_model');
const Employee = require('../models/employee_model');

// Add a new staff member and assign an employee as a supervisor
router.post('/add', async (req, res) => {
  const { staffId, fullName, role, supervisorId } = req.body;

  try {
    const supervisor = await Employee.findById(supervisorId);
    if (!supervisor) {
      return res.status(404).json({ error: 'Supervisor not found' });
    }

    const staff = new Staff({ staffId, fullName, role, supervisor: supervisor._id });
    await staff.save();
    res.status(201).json(staff);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all staff members with their supervisors populated
router.get('/all', async (req, res) => {
  try {
    const staff = await Staff.find().populate('supervisor');
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
