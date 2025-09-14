const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 9932;

app.get("/", (req, res) => {
  console.log("Hello World"); // logs to the server console
  res.send(`<h1>"Hello World"</h1>`); // sends text response to the browser
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
