// server.js
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(morgan('combined'));
const cors = require('cors');



// Routes
const employeeRoutes = require('./src/routes/employeeRoutes');
const messageRoutes = require('./src/routes/messageRoutes');
const announcementRoutes = require('./src/routes/announcementRoutes');
const programRoutes = require('./src/routes/programRoutes');
const payslipRoutes = require('./src/routes/payslipRoutes');
const attendanceRoutes = require('./src/routes/attendanceRoutes');
const leaveRoutes = require('./src/routes/leaveRoutes'); // Import the new route

app.use(cors());

app.use('/api', employeeRoutes);
app.use('/api', messageRoutes);
app.use('/api', announcementRoutes);
app.use('/api', programRoutes);
app.use('/api', payslipRoutes);
app.use('/api', attendanceRoutes);
app.use('/api', leaveRoutes); // Use the leave routes

// Default Route
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
