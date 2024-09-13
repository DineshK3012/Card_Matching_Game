const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const cors = require('cors')

//configuring the env file only in development mode
if (process.env.NODE_ENV !== 'PRODUCTION')
    require("dotenv").config({ path: "config/config.env" })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configure CORS with credentials
const corsOptions = {
    origin: process.env.FRONTEND_URL, // Replace with your frontend URL
    credentials: true, // Allow requests with credentials (cookies)
    optionSuccessStatus: 200 // Some legacy browsers may require this
}

app.use(cors(corsOptions));

const user = require('./routes/user');

app.use('/api/users', user);

module.exports = app;
