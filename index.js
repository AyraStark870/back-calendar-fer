const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;
const { dbConnection } = require("./DB/config");

const app = express();

dbConnection();

app.use(cors());

app.use(express.static("public"));

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

app.listen(port, () => {
  console.log(`server listening in port ${port}`);
});
