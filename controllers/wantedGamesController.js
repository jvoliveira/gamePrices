let fs = require('fs');

let rawdata = fs.readFileSync(__dirname+'/../resources/wantedGames.json');
const json = JSON.parse(rawdata);
const games = json.list;
module.exports = { games }