const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRouter");

const app = express();
const PORT = process.env.PORT || 9932;

//Middleware
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  console.log("Hello World");
  res.send(`<h1>"Hello World"</h1>`);
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
