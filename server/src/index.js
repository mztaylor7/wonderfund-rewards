require('newrelic');
require('dotenv').config();
const path = require("path");
const express = require("express");
const xss = require('xss-clean');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const db = require('./database/index.js');
const paramPluck = require("./middleware/paramPluck");

// require("dotenv").config({ path: path.resolve(__dirname, "./config/.env") });
const app = express();

app.use(cors());
app.use(helmet());
app.use(xss());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get("/api/projects/find", paramPluck, db.getOneProject);
// app.get("/api/projects/user", paramPluck, db.getUserImage);

app.get("/api/rewards", paramPluck, db.getRewards);
app.post("/api/rewards", paramPluck, db.createOneReward);
app.put("/api/rewards", paramPluck, db.updateOneReward);
app.patch("/api/rewards", paramPluck, db.updateOneReward);
app.delete("/api/rewards", paramPluck, db.deleteOneReward);

app.get('/', (req, res) => {
  res.send('Hello world');
})

app.use("/", express.static(path.resolve(__dirname, "../../client/dist")));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'))
})

const PORT = process.env.PORT || 3006;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})