/* @flow */

const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { cleanString } = require('../../util/misc');

function twitchTitle($): string {
  const titleElem = 'meta[property="og:description"]';
  let title : string = $(titleElem).attr('content');
  title = cleanString(title);

  // const streamerElem = 'meta[property="og:title"]';
  // let streamer : string = $(streamerElem).attr('content');
  // streamer = cleanString(streamer);

  return title;
}

async function handleTwitch(url: string): Promise<?TitleInfo> {
  const page = fetch(url).then(x => x.text());
  const $ = page.then(res => cheerio.load(res));
  const text : string = await $.then(twitchTitle);
  return { text, nobotOverride: false };
}

module.exports = {
  handleTwitch,
};
