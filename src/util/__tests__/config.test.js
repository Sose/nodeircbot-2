/* @flow */

const config = require('../config');

test('It reads a config file properly', () => {
  config.loadConfig();
  expect(typeof config.getConfig()).toEqual(typeof {});
});
