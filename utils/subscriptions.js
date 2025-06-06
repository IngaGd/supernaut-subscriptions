const path = require("path");
const fs = require("fs");

const dataFilePath = path.join(__dirname, "../data/subscriptions.json");

const fileData = fs.readFileSync(dataFilePath, "utf8");
let subscriptions = [];
subscriptions = JSON.parse(fileData);

module.exports = { subscriptions, dataFilePath };
