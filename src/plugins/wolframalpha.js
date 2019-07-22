const fetch = require('node-fetch');
const xml2js = require('xml2js');

const config = require('../util/config').getConfig();

const appId: string = config.plugins.wolframalpha.apikey;
const URI = 'http://api.wolframalpha.com/v2/query';

const log = require('../util/logging').log;

function buildURI(question: string): string {
  return `${URI}?input=${question}&appid=${appId}`;
}

function answer(question: string): Promise<string> {
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
  return fullResponse.then(x => x.queryresult.pod[1].subpod[0].plaintext[0]).catch((err) => {
    log(`Error in wolframalpha.js: ${err}`);
  });
}

// @flow
async function handleMessage(msg:string): Replies {
  const regex = /^!wa (.*)$/gi;
  const matches = regex.exec(msg);
  const question: string = matches[1];
  if (matches && question) {
    const res: string = await answer(question);
    return [res];
  }

  return [];
}

module.exports = {
  name: 'wolframalpha',
  handle: handleMessage,
};
