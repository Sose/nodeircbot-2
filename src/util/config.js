const fs = require('fs');
const path = require('path');

const currentConfig = {

};

// @flow
function loadFile(filename: string) {
  console.log(filename);
}

function load() {
  loadFile('default.txt');
}

function get(key) {
  return currentConfig[key] ? currentConfig[key] : undefined;
}

module.exports = {
  load,
  get,
};
