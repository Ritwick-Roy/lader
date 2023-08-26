const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
require('dotenv').config();
const connectDB = require("./config/db");
const s3_routes = require('./routes/s3.routes'); 
const PORT=process.env.PORT||5000;

connectDB();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/s3', s3_routes);

app.listen(PORT, () =>
  console.log(`Server is running on port: ${PORT}`)
);

module.exports = app;
