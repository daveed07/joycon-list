const fs = require("fs");

const readData = () => {
  // fs.readFile("./src/log.json", "utf-8", (err, data) => {
  //   if (err) throw err;
  //   let json = JSON.parse(data);
  //   return json;
  // });
  const json = fs.readFileSync('./src/log.json', 'utf-8');
  return JSON.parse(json);
};

module.exports = readData;
