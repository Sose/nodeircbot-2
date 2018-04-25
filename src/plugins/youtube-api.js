const fetch = require('node-fetch');

const myAPIKey = 'AIzaSyDdseY410t05krbw2tLv0tGUgUuaMlj5a0';
const APIURL = 'https://www.googleapis.com/youtube/v3';

const params = (id, parts) => `id=${id}&part=${parts}&key=${myAPIKey}`;
const fetchUrl = videoId => `${APIURL}/videos?${params(videoId, 'snippet')}`;

const { log } = require('../util/logging');

async function youtubeTitle(videoId) {
  const response = await fetch(fetchUrl(videoId)).then(res => res.json());
  log(`Response: ${response}`);

  if (response) {
    const info = response.items[0];
    if (info) {
      const res = {
        youtube: true,
        title: info.snippet.title,
        uploader: info.snippet.channelTitle,
      };

      return res;
    }
  }

  return null;
}

module.exports = {
  youtubeTitle,
};
