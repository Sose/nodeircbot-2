/* @flow */

const ht = require('../httptitle');

function testMsg(msg: string, correct: Array<string>, done: () => void): void {
  ht.handle(msg).then((x) => {
    expect(x).toEqual(correct);
    done();
  });
}

test('It works for youtube titles', (done) => {
  const msg = 'asdasd https://www.youtube.com/watch?v=P73REgj-3UE https://youtu.be/XKs5mkEpWuU https://www.youtube.com/watch?v=GOJUNJ1o394';
  const correct = [
    'YT (Primitive Technology): Primitive Technology: Tiled Roof Hut',
    'YT (juckis): Wings - PELIMUSA - Jussi Huhtala (game music)',
    'YT (alt-J): alt-J - Deadcrush (Official Video)',
  ];

  testMsg(msg, correct, done);
});

test('It returns undefined with no urls', (done) => {
  const msg = 'no urls here';
  const correct = [];

  testMsg(msg, correct, done);
});

test('It works for random urls', (done) => {
  const msg = 'http://google.fi yee http://www.yle.fi';
  const correct = [
    'title: Google',
    'title: Yle.fi - oivalla jotain uutta',
  ];

  testMsg(msg, correct, done);
});

test('Iltalehti works xD', (done) => {
  const msg = 'http://www.iltalehti.fi/ulkomaat/201804272200907446_ul.shtml';
  const correct = ['title: Merkel tapaa tänään Trumpin: Saksalaismedia ihmettelee lyhyttä tapaamista'];

  testMsg(msg, correct, done);
});
