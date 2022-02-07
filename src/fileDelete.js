const fs = require("fs");

const deleteData = (id) => {
  fs.readFile("./src/log.json", "utf-8", (err, data) => {
    if (err) throw err;
    let arr = JSON.parse(data);
    for (let i = 0; i < arr.users.length; i++) {
      if (arr.users[i].id == id) {
        arr.users.splice(i, 1);
      }
    }

    fs.writeFile("./src/log.json", JSON.stringify(arr), "utf-8", (err) => {
      if (err) throw err;
      console.log("Data removed!");
    });
  });
};

module.exports = deleteData;
