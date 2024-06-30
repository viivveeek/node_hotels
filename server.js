const express = require("express");
const app = express();
const db = require("./db");
app.use(express.json());
require("dotenv").config();

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const person_routes = require("./routes/person_routes");
app.use("/person", person_routes);
const menu_routes = require("./routes/menu_routes");
app.use("/menu", menu_routes);

// hello
app.listen(PORT, () => {
  console.log("Server started on port 3000");
});
