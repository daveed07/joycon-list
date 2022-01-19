const writeData = require("./fileWriter.js");
const deleteData = require("./fileDelete.js");
const patchData = require("./filePatch.js");
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
  const id =
    json.users.length == 0
      ? json.users.length + 1
      : json.users[json.users.length - 1].id + 1;
  const info = {
    date: date,
    id: id,
    name: body.name,
    phone: body.phone,
    side: body.side,
    color: body.color,
    state: body.state,
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
      res.send({ users:responseArr });
    }
  } else {
    let responseArr = [];
    for (let i = 0; i < json.users.length; i++) {
      if (json.users[i].name == ident) {
        responseArr.push(json.users[i]);
      }
    }
    res.send({ users:responseArr });
  }
});

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  if (!json.users[id - 1]) {
    return res.status(404).json({ error: "404", message: "Not found" });
  }
  deleteData(id);
   return res.send("DELETE Request called");
});

app.patch("/api/users/:ident", (req, res) => {
  const { ident } = req.params;
  const body = req.body;
  for (let i = 0; i < json.users.length; i++) {
    if (json.users[i].id == ident) {
      let name = body.name === "" ? json.users[i].name : body.name;
      let phone = body.phone === "" ? json.users[i].phone : body.phone;
      let side = body.side === "" ? json.users[i].side : body.side;
      let color = body.color === "" ? json.users[i].color : body.color;
      let state = body.state === "" ? json.users[i].state : body.state;

      const info = {
        date: json.users[i].date,
        id: ident,
        name: name,
        phone: phone,
        side: side,
        color: color,
        state: state,
      };

      patchData(info, ident);
      res.json({ message: "I edit the data" });
    }
  }
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
