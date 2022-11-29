// Module imports
const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();
const cors = require("cors");

// Enable Express
const app = express();
// Middlewares
app.use(cors());
app.use(express.json());
// Database config
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Endpoints

app.get("/", (req, res) => {
  console.log("is it working engage!");
  pool.query(
    "SELECT project_id, name, project_pic, activity_type, year_level, course, subscription, subject_matter FROM missio20_team8.project;",
    (err, result) => {
      console.log(result);
      res.send(result);
    }
  );
});
