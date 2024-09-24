// models/staff_model.js
const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  staffId: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',  // Reference to Employee model
  }
});

const Staff = mongoose.model('Staff', staffSchema);
module.exports = Staff;
