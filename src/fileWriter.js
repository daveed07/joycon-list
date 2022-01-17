const fs = require("fs");

const writeData = (input) => {
  fs.readFile("./src/log.json", "utf-8", (err, data) => {
    if (err) throw err;
    let arr = JSON.parse(data);
    arr.users.push(input);

    fs.writeFile("./src/log.json", JSON.stringify(arr), "utf-8", (err) => {
      if (err) throw err;
      console.log("Data pushed!");
    });
  });
};

module.exports = writeData;
