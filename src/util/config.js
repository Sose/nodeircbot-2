/* @flow */

const fs = require('fs');
// const path = require('path');

type Config = Object

let config;

function loadConfig(filename: ?string = 'botconfig.default.json'): Config {
  const contents : string = fs.readFileSync(filename);
  config = JSON.parse(contents);
  Object.freeze(config);
  return config;
}

function getConfig(): Config {
  return config;
}

module.exports = {
  loadConfig, getConfig,
};

// load defaults
// load custom config if present
// replace defaults with custom values if found
// store config and somehow able to retrieve values from it?
// singleton pattern?

