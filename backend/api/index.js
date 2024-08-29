const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const session = require('express-session'); 
const helmet = require('helmet');
const connectDB = require('../mongo/connect_mongo');
const studentAllRoutes = require('../routes/allRoutes');
const studentCurrentRoutes = require('../routes/currentRoutes');
const authRoutes = require('../routes/authRoutes.js');
const { checkAuth } = require("../middleware/checkAuth.js");
const MongoStore = require('connect-mongo');

dotenv.config();
const app = express();

connectDB();

const corsMiddleware = (req, res, next) => {
    const allowedOrigin = process.env.NODE_ENV === "production" ? process.env.FRONTEND_ORIGIN : 'http://localhost:5173';
    const origin = req.headers.origin;
  
    if (allowedOrigin === origin) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
  
    res.setHeader('Access-Control-Allow-Credentials', "true");
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
  
    if (req.method === 'OPTIONS') {
      res.status(200).end(); 
      return;
    }
  
    next();
};
app.use(helmet());
app.use(corsMiddleware);
app.use(bodyParser.json());

app.use(session({
    key: "sessionId",
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 24 * 1000, // 24 hours
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    },
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
}));


app.use('/api/all', checkAuth, studentAllRoutes);
app.use('/api/current', checkAuth, studentCurrentRoutes);
app.use('/api/auth', authRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;