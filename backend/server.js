const express = require('express');
const itemsRouter = require('./routes/itemRoutes');
const userRoutes = require('./routes/userRoutes');
const dotenv = require("dotenv").config();
const errorHandler = require('./middleware/errorMiddleware');
const port = process.env.PORT || 2001;
const connectDB = require('./config/db');
const app = express();

//Connecting with DB.
connectDB();


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/items/", itemsRouter);
app.use("/api/v1/users", userRoutes);


// app.use(errorHandler);
app.listen(port, ()=>{
    console.log("Server running on port 2000");
});