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

test('It stays silent with no urls', (done) => {
  ht.handle('asldkasd http:// apsdkaposk do google.com', () => {
    // TODO: how to ensure the callback never gets called?
    expect(1).toEqual(2);
    done();
  });
});

test('It works for random urls', (done) => {
  const urls = [
    { url: 'http://google.fi', correctAnswer: 'title: Google' },
    { url: 'http://www.yle.fi', correctAnswer: 'title: Yle.fi - oivalla jotain uutta' },
  ];

  let counter = 0;
  const msg = 'http://google.fi yee http://www.yle.fi';
  ht.handle(msg, (x) => {
    expect(x).toEqual(urls[counter].correctAnswer);
    counter += 1;
    if (counter === 2) done();
  });
});
