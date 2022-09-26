/**
 * Create on Sep 8th 
 * Code by Zeen Wu
 */

// dependency
const express = require("express")
const app = express()
const config = require('./config/config');

const path = require("path");
const PORT = process.env.PORT || 5000;

app.use('/login', require('./module/login/login'))
app.use('/login/user', require('./module/login/user'))
app.use('/category', require('./module/category'))
app.use('/product', require('./module/product'))
app.use('/order', require('./module/order'))
app.use('/item', require('./module/item'))
app.use('/review', require('./module/review'))


app.use('/admin', require('./module/admin'))

// declare react files in build as static
app.use(express.static(path.join(__dirname, "../client/build")));

// serve index.html from the build folder
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

