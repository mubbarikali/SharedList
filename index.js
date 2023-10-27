const express = require('express');
const itemsRouter = require('./routes/items');
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use("/items/", itemsRouter);

mongoose.connect(process.env.DB_CONNECTION_URL)
  .then(() => {
    console.log("Connected to DB.");
  })
  .catch((err) => {
    console.error("Error connecting to DB:", err);
  });


app.listen(process.env.PORT, ()=>{
    console.log("Server running on port 2000");
});