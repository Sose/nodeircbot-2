/* @flow */

const he = require('he');

function cleanString(str: string): string {
  const res = str.replace(/\s+/g, ' ').trim();
  return he.decode(res);
}

module.exports = {
  cleanString,
};
