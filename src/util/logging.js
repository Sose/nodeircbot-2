/* @flow */

const log = (msg: string, severity:number = 0): void => {
  // eslint-disable-next-line no-console
  console.log(`${severity}: ${msg}`);
};

module.exports = {
  log,
};
