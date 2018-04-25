const wa = require('../wolframalpha');

test('Works', (done) => {
  wa.handle('!wa 100 isk in eur', (x) => {
    expect(x).toMatch(/euro(.*)/gi);
    done();
  });
});
