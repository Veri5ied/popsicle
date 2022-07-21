//modules import
const express = require("express");
const sequelize = require("sequelize");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./models");
const userRoutes = require("./routes/users/userRoutes");

dotenv.config();
//port setup
const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

db.sequelize.sync({ force: true }).then(() => {
  console.log("Database connected successfully");
});

app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
