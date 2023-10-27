const express = require('express');
const coursesRouter = require('./routes/courses');
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use("/api/v1/courses/", coursesRouter);

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