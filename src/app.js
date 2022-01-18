const writeData = require("./fileWriter.js");
const deleteData = require("./fileDelete.js");
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
  const id = json.users[json.users.length - 1].id + 1;
  const info = {
    date: date,
    id: id,
    name: body.name,
    phone: body.phone,
    select: body.select,
    color: body.color,
  };
  writeData(info);
  res.json({ message: "I got the data" });
});

app.get("/api/users", (req, res) => {
  res.send(json);
});

app.get("/api/users/:ident", (req, res) => {
  const { ident } = req.params;
  if (/\d/.test(ident)) {
    if (ident.toString().match(/\d/g).length < 6) {
      if (ident > json.users.length || ident <= 0) {
        res.status(404).json({ error: "404", message: "Not found" });
      } else {
        res.send(json.users[ident - 1]);
      }
    } else if (ident.toString().match(/\d/g).length >= 6) {
      let responseArr = [];
      for (let i = 0; i < json.users.length; i++) {
        if (json.users[i].phone == ident) {
          responseArr.push(json.users[i]);
        }
      }
      res.send({ users: responseArr });
    }
  } else {
    let responseArr = [];
    for (let i = 0; i < json.users.length; i++) {
      if (json.users[i].name == ident) {
        responseArr.push(json.users[i]);
      }
    }
    res.send({ users: responseArr });
  }
});

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  deleteData(id);
  res.send("DELETE Request called");
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
