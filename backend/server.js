const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose")

// creating express app
const app =  express();

//middlewares for sending post request. cause it has body
app.use(express.json());



// API routes
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bills", require("./routes/billsRoute"));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Database connected successfully");
    // Start the server after successfully connecting to the database
    app.listen(process.env.PORT, () => {
      console.log("Port is listening at-" , process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:".red, error);
  });