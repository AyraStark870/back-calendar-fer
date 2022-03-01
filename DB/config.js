const mongoose = require("mongoose");
require("dotenv").config();


const dbConnection = () =>
  new Promise((resolve, reject) => {
    mongoose.connect(
      process.env.MONGODB_CNN ,
      {
        useNewUrlParser: true,
      }
    );

    const db = mongoose.connection;

    db.on("open", () => {
      console.warn("Connection successful");
      resolve(mongoose);
    });

    db.on("error", (error) => {
      console.error("Connection failed", error);
      reject(error);
    });
  });

module.exports = {
  dbConnection,
};

