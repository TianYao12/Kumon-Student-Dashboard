const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const session = require('express-session'); 
const connectDB = require('./mongo/connect_mongo');
const studentAllRoutes = require('./routes/allRoutes');
const studentCurrentRoutes = require('./routes/currentRoutes');
const authRoutes = require('./routes/authRoutes.js');

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use(session({
    key: 'userId',
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'lax'
    }
}));

app.use('/api/all', studentAllRoutes);
app.use('/api/current', studentCurrentRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello, broskui hello owrlkduy7!');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
