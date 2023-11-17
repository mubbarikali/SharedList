const path = require('path');
const express = require('express');
const itemsRouter = require('./routes/itemRoutes');
const userRoutes = require('./routes/userRoutes');
const dotenv = require("dotenv").config();
const errorHandler = require('./middleware/errorMiddleware');
const port = process.env.PORT || 2000;
const connectDB = require('./config/db');
const app = express();

//Connecting with DB.
connectDB();


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/items/", itemsRouter);
app.use("/api/v1/users", userRoutes);


// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      )
    );
  } else {
    app.get('/', (req, res) => res.send('Please set to production'));
  }


// app.use(errorHandler);
app.listen(port, ()=>{
    console.log("Server running on port 2000");
});