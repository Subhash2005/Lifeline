const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB().catch(err => {
    console.warn('⚠️ MongoDB not connected. Running in Mock Mode.');
    console.error(err.message);
});

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes placeholder
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Import and use routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/campaigns', require('./routes/campaign'));
app.use('/api/donations', require('./routes/donation'));
app.use('/api/volunteers', require('./routes/volunteer'));
app.use('/api/hospitals', require('./routes/hospital'));
app.use('/api/ledger', require('./routes/ledger'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
