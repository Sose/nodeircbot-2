
const log = (msg, severity = 0) => {
  // eslint-disable-next-line no-console
  console.log(`${severity}: ${msg}`);
};

module.exports = {
  log,
};
