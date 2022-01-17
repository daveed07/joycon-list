const writeData = require("./fileWriter.js");
const json = require("./log.json");
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
  )}`;
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

app.get("/api/users", (req, res) => {
  res.send(json);
});

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  if (id > json.users.length || id <= 0) {
    res.status(404).json({ error: '404', message: "Not found" });
  } else {
    res.send(json.users[id - 1])
  }
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
