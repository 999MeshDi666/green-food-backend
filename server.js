const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT;
const catalogs = require('./routes/catalogs');
const orders = require('./routes/orders');
const users = require('./routes/users');
const path = require('path');

app.use(express.json());
app.use('/api/catalogs', catalogs);
app.use('/api/orders', orders);
app.use('/api/auth', users);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('mongo has been connected');
    app.listen(port, () => {
      console.log('start on port: ', port);
    });
  })
  .catch((error) => {
    console.log('error: ', error);
  });
