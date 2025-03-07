const express = require('express');
require('dotenv').config()
const connectDb = require('./config/db');

const app = express();

connectDb;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/', (req, res) => {
  res.send('Welcome to the Note Taking App');
} );  

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
