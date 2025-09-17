const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const doctorRoutes = require('./routes/doctor');

const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:19006', 'http://127.0.0.1:5500', 'file://'],
  credentials: true
}));
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', doctorRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
