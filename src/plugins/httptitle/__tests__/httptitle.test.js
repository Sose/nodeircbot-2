/* @flow */

const ht = require('../httptitle');

type TestCase = {
  description: string,
  msg: string,
  correct: Array<string>,
}

function testMsg({ msg, correct }: TestCase, done: () => void): void {
  ht.handle(msg).then((x) => {
    expect(x).toEqual(correct);
    done();
  });
}

function testOne(testCase: TestCase): void {
  const { description } = testCase;
  test(description, (done) => {
    testMsg(testCase, done);
  });
}

function testAll(tests: Array<TestCase>): void {
  tests.forEach(testOne);
}

const tests : Array<TestCase> = [
  {
    description: 'It works for youtube titles',
    msg: 'asdasd https://www.youtube.com/watch?v=P73REgj-3UE https://youtu.be/XKs5mkEpWuU https://www.youtube.com/watch?v=GOJUNJ1o394',
    correct: [
      'YT (Primitive Technology): Primitive Technology: Tiled Roof Hut',
      'YT (juckis): Wings - PELIMUSA - Jussi Huhtala (game music)',
      'YT (alt-J): alt-J - Deadcrush (Official Video)',
    ],
  },

  {
    description: 'It returns undefined with no urls',
    msg: 'no urls here',
    correct: [],
  },

  {
    description: 'It works for random urls',
    msg: 'http://google.fi yee http://www.yle.fi',
    correct: [
      'title: Google',
      'title: Yle.fi - oivalla jotain uutta',
    ],
  },

  {
    description: 'ISO-8859-1 works',
    msg: 'http://www.iltalehti.fi/ulkomaat/201804272200907446_ul.shtml',
    correct: ['title: Merkel tapaa tänään Trumpin: Saksalaismedia ihmettelee lyhyttä tapaamista'],
  },
];

testAll(tests);
