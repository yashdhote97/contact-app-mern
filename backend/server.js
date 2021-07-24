const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { dbUrl } = require("./config/config");
//Exporting Routes
const authRoute = require("./routes/auth");
const contactList = require("./routes/contactList");

const app = express();

const PORT = 5000;

//Connecting DB

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => console.log(err));

db.once("open", () => console.log("Connected to Database"));

//MIDDLEWARES
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTE MIDDLEWARE
app.use("/user", authRoute);
app.use("/contacts",contactList);

//LISTENING
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
