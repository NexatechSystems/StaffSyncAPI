// src/routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const messageService = require('../services/messageService');

// Route to get all messages for a specific employee email
router.get('/messages/:email', async (req, res) => {
  const employeeEmail = req.params.email;

  try {
    const messages = await messageService.getMessagesByEmployeeEmail(employeeEmail);
    if (messages.length > 0) {
      res.status(200).json(messages);
    } else {
      res.status(404).json({ message: 'No messages found for this employee' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
