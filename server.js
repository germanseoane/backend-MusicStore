require("dotenv").config;
const express = require("express");
const connectDB = require("./mongoDB/connectDB");
const guitarsRoute = require("./routes/guitarsRoute");
const bassesRoute = require("./routes/bassRoute");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(express.json());
app.use("/api/guitars", guitarsRoute);
app.use("/api/basses", bassesRoute);

connectDB();

app.get("/", async (req, res) => {
  res.send("<h2>Music Store Api</h2>");
});

const host = process.env.HOST || "0.0.0.0";

const port = process.env.PORT || 5000;
app.listen(port, console.log(`listening to port: ${port}`));
