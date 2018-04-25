const fetch = require('node-fetch');
const cheerio = require('cheerio');
const cleanString = require('../../util/misc');

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

async function handleTwitch(url: string): Promise<?TitleInfo> {
  const page = fetch(url).then(x => x.text());
  const $ = page.then(res => cheerio.load(res));
  const titleObj = await $.then(twitchTitle);
  return { text: `title: ${titleObj.title}` };
}

module.exports = {
  handleTwitch,
};
