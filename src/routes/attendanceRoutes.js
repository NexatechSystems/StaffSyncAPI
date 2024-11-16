// src/routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const attendanceService = require('../services/attendanceService');

// Route to get all attendance records for a specific employee email
router.get('/attendance/:email', async (req, res) => {
  const employeeEmail = req.params.email;

  try {
    const attendanceRecords = await attendanceService.getAttendanceByEmployeeEmail(employeeEmail);
    if (attendanceRecords.length > 0) {
      res.status(200).json(attendanceRecords);
    } else {
      res.status(404).json({ message: 'No attendance records found for this employee' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Route to update the clocked_in status for a specific employee email
router.put('/attendance/:email', async (req, res) => {
  const employeeEmail = req.params.email;
  const { clocked_in } = req.body; // Expecting a JSON body with clocked_in value

  try {
    const rowsAffected = await attendanceService.updateClockedInStatus(employeeEmail, clocked_in);
    if (rowsAffected > 0) {
      res.status(200).json({ message: 'Attendance status updated successfully' });
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
