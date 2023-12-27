const express = require("express");
const bodyParser = require("body-parser");
const contactRoutes = require("./routes/contactRoutes");
const connectDb = require("./config/dbconnection");

connectDb();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/contacts", contactRoutes); 

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});