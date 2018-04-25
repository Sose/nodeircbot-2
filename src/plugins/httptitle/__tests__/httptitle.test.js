/* @flow */

const ht = require('../httptitle');

/*
test('It works for youtube titles', () => {
  ht.handle('asdasd https://www.youtube.com/watch?v=P73REgj-3UE https://youtu.be/XKs5mkEpWuU https://www.youtube.com/watch?v=GOJUNJ1o394', (x) => {
    // TODO: test correct order & results
    // console.log(num);
    // console.log(x);
  });
});
*/

test('It returns undefined with no urls', (done) => {
  ht.handle('asldkasd http:// apsdkaposk do google.com').then((x) => {
    // TODO: how to ensure the callback never gets called?
    expect(x).toEqual([]);
  });
  done();
});

test('It works for random urls', (done) => {
  const correct = [
    'title: Google',
    'title: Yle.fi - oivalla jotain uutta',
  ];

  const msg = 'http://google.fi yee http://www.yle.fi';
  ht.handle(msg).then((x) => {
    expect(x).toEqual(correct);
    done();
  });
});
