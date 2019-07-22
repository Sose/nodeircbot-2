/* @flow */

const youtube = require('./youtube-api');
const twitch = require('./twitch');
const defaulthandler = require('./default');

const { log } = require('../../util/logging');

log('httptitle.js loaded');

type UrlHandler = {
  name: string,
  regex: RegExp,
  handle: (url: string) => Promise<?TitleInfo>
}

const cases: Array<UrlHandler> = [
  {
    name: 'youtube',
    regex: /(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/g,
    handle: youtube.handleYoutube,
  },
  {
    name: 'twitch',
    regex: /(https?:\/\/)?(www\.)?(twitch\.tv)\/.+/g,
    handle: twitch.handleTwitch,
  },
  {
    name: 'default',
    regex: /.*/gi,
    handle: defaulthandler.handleDefault,
  },
];

async function handleUrl(url: string, hasNobot: boolean): Promise<?string> {
  for (const c of cases) {
    c.regex.lastIndex = 0; // need to reset this because we are reusing the regex object
    if (c.regex.test(url)) {
      const answer: ?TitleInfo = await c.handle(url);
      if (answer && !(hasNobot && !answer.nobotOverride)) {
        return answer.text;
      }
      return null;
    }
  }

  return null;
}

async function handleMessage(msg: string): Replies {
  const urls = msg.match(/https?:\/\/\S+/gi);
  if (urls) {
    const msgHasNobot = !!msg.match(/n[o'][b'][o']t/i);
    const answers = urls.map(url => handleUrl(url, msgHasNobot));

    const results: Array<string> = [];

    // call the reply callback for each answer string
    for (const ans of answers) {
      const x = await ans;
      if (x && x.trim() !== '') {
        results.push(x);
      }
    }

    return results;
  }

  return [];
}

module.exports = {
  name: 'title',
  handle: handleMessage,
};

