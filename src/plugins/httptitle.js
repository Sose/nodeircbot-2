const cheerio = require('cheerio');
const he = require('he');
const fetch = require('node-fetch');

const { log } = require('../util/logging');

const youtube = require('./youtube-api');

function getYoutubeId(url) {
  const regex = /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function antiNobot({ uploader }) {
  const bannedUppers = [
    /Sita Salminen/gi,
    /ASMR Sita Sofia/gi,
    /mansikkka/gi,
    /ILONA/gi,
    /Deata/gi,
  ];

  for (const buster of bannedUppers) {
    if (uploader.match(buster)) {
      return true;
    }
  }

  return false;
}

async function handleYoutube(url) {
  const id = getYoutubeId(url);
  const res = await youtube.youtubeTitle(id);

  const nobotOverride = antiNobot(res);

  if (res && res.title) {
    const text = `YT (${res.uploader}): ${res.title}`;
    return { text, nobotOverride };
  }

  return null;
}

function cleanString(str) {
  const res = str.replace(/\s+/g, ' ').trim();
  return he.decode(res);
}

function twitchTitle($) {
  const titleElem = 'meta[property="og:description"]';
  let title = $(titleElem).attr('content');

  const streamerElem = 'meta[property="og:title"]';
  let streamer = $(streamerElem).attr('content');

  title = cleanString(title);
  streamer = cleanString(streamer);

  return {
    twitch: true,
    title,
    uploader: streamer,
    nobotOverride: false,
  };
}

async function handleTwitch(url) {
  const page = fetch(url).then(x => x.text());
  const $ = page.then(res => cheerio.load(res));
  const titleObj = await $.then(twitchTitle);
  return { text: `title: ${titleObj.title}` };
}


function findTitle($) {
  let title = $('head > title').text();
  title = cleanString(title);

  if (!title) {
    title = $('title').text();
    title = cleanString(title);
  }

  return {
    title,
    uploader: '',
    nobotOverride: false,
  };
}

async function handleDefault(url) {
  const page = fetch(url).then(x => x.text());
  const $ = page.then(res => cheerio.load(res));
  const titleObj = await $.then(findTitle);
  return { text: `title: ${titleObj.title}` };
}

const cases = [
  {
    name: 'youtube',
    regex: /(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/g,
    handle: handleYoutube,
  },
  {
    name: 'twitch',
    regex: /(https?:\/\/)?(www\.)?(twitch\.tv)\/.+/g,
    handle: handleTwitch,
  },
  {
    name: 'default',
    regex: /.*/gi,
    handle: handleDefault,
  },
];


async function handleUrl(url, hasNobot) {
  for (const c of cases) {
    c.regex.lastIndex = 0; // need to reset this because we are reusing the regex object
    if (c.regex.test(url)) {
      const answer = await c.handle(url);
      if (!(hasNobot && !answer.nobotOverride)) {
        return answer.text;
      }
      return null;
    }
  }

  return null;
}

async function handleMessage(msg, replyFn) {
  const urls = msg.match(/https?:\/\/\S+/gi);
  if (urls) {
    const msgHasNobot = !!msg.match(/n[o'][b'][o']t/i);
    const answers = urls.map(url => handleUrl(url, msgHasNobot));

    // call the reply callback for each answer string
    for (const ans of answers) {
      const x = await ans;
      replyFn(x);
    }
  }
}


module.exports = {
  name: 'title',
  handle: handleMessage,
};

