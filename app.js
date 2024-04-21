const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./router/users");
const driverRouter = require("./router/drivers");

require("dotenv").config();

const cors = require("cors");
const app = express();

mongoose.set("strictQuery", true);
const url =process.env.MONGODB_URL;
const port = process.env.PORT || 9000;
mongoose.connect(url);
const con = mongoose.connection;
con.once("open", () => {
  console.log("Mongo DB connected");
});


app.use(express.json());

app.get('/',(req,res)=>{
  res.send('Hello World')
})

app.use(express.json());
app.use(
  cors()
);

app.use("/user", userRouter);
app.use("/driver", driverRouter);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});