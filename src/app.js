const writeData = require("./fileWriter.js");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");
const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.post("/send", (req, res) => {
  const body = req.body;
  const data = {
    date: `${moment().subtract(10, "days").calendar()} ${moment().format(
      "LT"
    )}`,
    name: body.name,
    phone: body.phone,
    select: body.select,
    color: body.color,
  };
  writeData(data);
  res.json({ message: "I got the data" });
});

app.get("/api", (req, res) => {
  res.sendFile(path.join(__dirname, "log.json"));
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
