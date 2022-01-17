const writeData = require("./fileWriter.js");
const idGen = require("./fileReader.js");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");
const fs = require("fs");
const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.post("/send", (req, res) => {
  const body = req.body;
  const date = `${moment().subtract(10, "days").calendar()} ${moment().format(
    "LT"
  )}`
  fs.readFile("./src/log.json", "utf-8", (err, data) => {
    if (err) throw err;
    let arr = JSON.parse(data);
    let id = arr.users.length + 1;
    const info = {
    date: date,
    id: idGen(id),
    name: body.name,
    phone: body.phone,
    select: body.select,
    color: body.color,
  };
  writeData(info);
  });

  const idGen = (id) => {
    return id;
  };
  res.json({ message: "I got the data" });
});

app.get("/api", (req, res) => {
  res.sendFile(path.join(__dirname, "log.json"));
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
