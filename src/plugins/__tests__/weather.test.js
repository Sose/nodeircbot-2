const weather = require('../weather');

test('Exports correct format', () => {
  expect(weather).toHaveProperty('name');
  expect(weather).toHaveProperty('handle');
});

test('Gets a response for !sää Oulu', () => {
  const msg = '!sää Oulu';

  weather.handle(msg, (answer) => {
    // eslint-disable-next-line max-len
    const c = /^\[Oulu, FI 65\.01 N, 25\.47 E\] .* °C, .*, tuulta .* m\/s, ilmanpaine .* hPa, kosteus .* %$/;
    const expected = expect.stringMatching(c);
    expect(answer).toEqual(expected);
  });
});

test('Gets response for Oulu with !sää', () => {
  const msg = '!sää';

  weather.handle(msg, (answer) => {
    // eslint-disable-next-line max-len
    const correct = /^\[Oulu, FI 65\.01 N, 25\.47 E\] .* °C, .*, tuulta .* m\/s, ilmanpaine .* hPa, kosteus .* %$/;
    const expected = expect.stringMatching(correct);
    expect(answer).toEqual(expected);
  });
});

test('Doesn\'t answer lines without !sää/!weather', () => {
  const msg = 'ripulia';

  weather.handle(msg, (answer) => {
    expect(answer).toEqual(null);
  });
});

test('answer() builds correct string', () => {
  // TODO
});
