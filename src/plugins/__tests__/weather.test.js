/* @flow */

const weather = require('../weather');

test('Exports correct format', () => {
  expect(weather).toHaveProperty('name');
  expect(weather).toHaveProperty('handle');
});

test('Gets a response for !sää Oulu', (done) => {
  const msg = '!sää Oulu';

  weather.handle(msg).then((answer) => {
    // eslint-disable-next-line max-len
    const c = /^\[Oulu, FI 65\.01 N, 25\.47 E\] .* °C, .*, tuulta .* m\/s, ilmanpaine .* hPa, kosteus .* %$/;
    const expected = expect.stringMatching(c);
    expect(answer[0]).toEqual(expected);
    done();
  });
});

test('Gets response for Oulu with !sää', (done) => {
  const msg = '!sää';

  weather.handle(msg).then((answer) => {
    // eslint-disable-next-line max-len
    const correct = /^\[Oulu, FI 65\.01 N, 25\.47 E\] .* °C, .*, tuulta .* m\/s, ilmanpaine .* hPa, kosteus .* %$/;
    const expected = expect.stringMatching(correct);
    expect(answer[0]).toEqual(expected);
    done();
  });
});

test('Doesn\'t answer lines without !sää/!weather', (done) => {
  const msg = 'ripulia';

  weather.handle(msg).then((answer) => {
    expect(answer).toEqual([]);
    done();
  });
});

test('answer() builds correct string', () => {
  // TODO
});
