const path = require("path");
const express = require("express");

const app = express();
const db = require('./database/index1.js');
const paramPluck = require("./middleware/paramPluck");

app.use(express.json());

app.get("/api/rewards", paramPluck, db.getRewards);
app.post("/api/rewards", paramPluck, db.createOneReward);
app.put("/api/rewards", paramPluck, db.updateOneReward);
app.patch("/api/rewards", paramPluck, db.updateOneReward);
app.delete("/api/rewards", paramPluck, db.deleteOneReward);

app.use("/", express.static(path.resolve(__dirname, "../../client/dist")));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'))
})

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})