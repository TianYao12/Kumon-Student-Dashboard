const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const session = require('express-session'); 
const connectDB = require('./mongo/connect_mongo');
const studentAllRoutes = require('./routes/allRoutes');
const studentCurrentRoutes = require('./routes/currentRoutes');
const authRoutes = require('./routes/authRoutes.js');
const { checkAuth } = require("./middleware/checkAuth.js");
const MongoStore = require('connect-mongo');

dotenv.config();
const app = express();

connectDB();

app.use(cors({
    origin: `http://localhost:5173`, 
    credentials: true, 
}));
app.use(bodyParser.json());

app.use(session({
    key: "sessionId",
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        expires: 60 * 60 * 24 * 1000, 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    },
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
}));

app.use('/api/all', checkAuth, studentAllRoutes);
app.use('/api/current', checkAuth, studentCurrentRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
