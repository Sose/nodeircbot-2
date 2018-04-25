const fetch = require('node-fetch');
const xml2js = require('xml2js');

const appId = '2A9JXV-W998PLKX8R';
const URI = 'http://api.wolframalpha.com/v2/query';

const log = require('../util/logging').log;

function buildURI(question) {
  return `${URI}?input=${question}&appid=${appId}`;
}

function answer(question) {
  const url = buildURI(question);

  const xmlString = fetch(url).then(res => res.text());

  const fullResponse = new Promise((resolve, reject) => {
    xmlString.then((str) => {
      xml2js.parseString(str, (err, res) => {
        if (err) reject(new Error('XML fail'));
        else resolve(res);
      });
    });
  });

  // TODO: ummm
  return fullResponse.then(x => x.queryresult.pod[1].subpod[0].plaintext).catch((err) => {
    log(`Error in wolframalpha.js: ${err}`);
  });
}

// @flow
async function handleMessage(msg:string): Replies {
  const regex = /^!wa (.*)$/gi;
  const matches = regex.exec(msg);
  if (matches && matches[1]) {
    const res = await answer(matches[1]);
    if (res && res[0]) {
      return [res[0]];
    }
  }

  return [];
}

module.exports = {
  name: 'wolframalpha',
  handle: handleMessage,
};
