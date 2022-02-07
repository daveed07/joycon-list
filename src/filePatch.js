const fs = require("fs");

const patchData = (input, id) => {
  fs.readFile("./src/log.json", "utf-8", (err, data) => {
    if (err) throw err;
    let arr = JSON.parse(data);
    arr.users.splice(id - 1, 1, input);

    fs.writeFile("./src/log.json", JSON.stringify(arr), "utf-8", (err) => {
      if (err) throw err;
      console.log("Data pushed!");
    });
  });
};

module.exports = patchData;
