
const mongoose = require('mongoose');
require('dotenv').config({path: './src/configs/.env'}); // Import and configure dotenv

// import users from './src/models/users';
const useUser = require('./src/models/users');
var cors = require('cors');
const connect = require("./src/configs/database")
const auth = require('./src/routes/routes');
 const express = require('express');
 const app = express();
 const bodyParser = require('body-parser');
const routes = require('./src/routes/routes');
// const { authenticateToken } = require('./src/middlewares/auth');
 app.set('view engine', 'html');
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(cors());

connect;
app.use(routes);
app.use('/',(req, res) => {
    res.status(200).json({
      message: 'active',
    });
  });
const port = process.env.PORT;
app.listen(port,
() => console.log(`Server running on port ${port}`)
)