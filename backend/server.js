const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const session = require('express-session'); // Import session
const connectDB = require('./mongo/connect_mongo');
const studentAllRoutes = require('./routes/allRoutes');
const studentCurrentRoutes = require('./routes/currentRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();

// Connect to the database
connectDB();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Session middleware setup
app.use(session({
    key: 'userId',
    secret: process.env.SESSION_SECRET || 'defaultsecret', // Ensure you use a secure secret in production
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24 * 1000, // 1 day
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
        sameSite: 'lax'
    }
}));

// Route handlers
app.use('/api/all', studentAllRoutes);
app.use('/api/current', studentCurrentRoutes);
app.use('/api/auth', authRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Hello, broskui hello owrlkduy7!');
});

// Error handling middleware (optional, but recommended)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
