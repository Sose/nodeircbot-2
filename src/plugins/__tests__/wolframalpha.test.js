/* @flow */

const wa = require('../wolframalpha');

test('Works', (done) => {
  wa.handle('!wa 100 isk in eur').then((x) => {
    expect(x[0]).toMatch(/euro(.*)/gi);
    done();
  });
});
