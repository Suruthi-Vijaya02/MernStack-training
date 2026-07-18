const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToDb = require("./config/db");
const productRoutes = require("../backend/routes/productRoute");



const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/products", productRoutes);

connectToDb();
app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});