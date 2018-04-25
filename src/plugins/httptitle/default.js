/* @flow */

const fetch = require('node-fetch');
const cheerio = require('cheerio');

const { cleanString } = require('../../util/misc');

function findTitle($): Object {
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

async function handleDefault(url: string): Promise<?TitleInfo> {
  const page = fetch(url).then(x => x.text());
  const $ = page.then(res => cheerio.load(res));
  const titleObj = await $.then(findTitle);
  if (titleObj.title && titleObj.title.trim() !== '') {
    return { text: `title: ${titleObj.title}`, nobotOverride: false };
  }

  return { text: '', nobotOverride: false };
}

module.exports = {
  handleDefault,
};
