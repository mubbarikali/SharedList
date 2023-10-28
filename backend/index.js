const express = require('express');
const itemsRouter = require('./routes/items');
const userRoutes = require('./routes/userRoutes');
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorMiddleware');
const port = process.env.PORT || 2001;
const connectDB = require('./config/db');
const app = express();

//Connecting with DB.
connectDB();

//Middlewares
app.use(bodyParser.json());
app.use("/items/", itemsRouter);
app.use("/users/", userRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// app.use(errorHandler);
app.listen(port, ()=>{
    console.log("Server running on port 2000");
});