/* @flow */

const config = require('../config');

test('Loads the config and returns it later', () => {
  const c1 = config.loadConfig();
  expect(typeof config.getConfig()).toEqual(typeof {});
  const c2 = config.getConfig();
  expect(c1).toEqual(c2);
});

