/* @flow */
const fetch = require('node-fetch');

const config = require('../../util/config').getConfig();

const { apikey, bannedUppers } = config.plugins.youtube;
const APIURL = 'https://www.googleapis.com/youtube/v3';

const params = (id, parts) => `id=${id}&part=${parts}&key=${apikey}`;
const fetchUrl = videoId => `${APIURL}/videos?${params(videoId, 'snippet')}`;

const { log } = require('../../util/logging');

log('Youtube-API loaded');

type YoutubeResponse = {
  title: string,
  uploader: string
}

function getYoutubeId(url: string): ?string {
  const regex = /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function antiNobot({ uploader }): boolean {
  for (const buster of bannedUppers) {
    if (uploader.match(buster)) {
      return true;
    }
  }

  return false;
}

async function youtubeTitle(videoId: string): Promise<?YoutubeResponse> {
  const response: Object = await fetch(fetchUrl(videoId)).then(res => res.json());

  if (response) {
    const info = response.items[0];
    if (info) {
      const res = {
        title: info.snippet.title,
        uploader: info.snippet.channelTitle,
      };

      return res;
    }
  }

  return undefined;
}

async function handleYoutube(url: string): Promise<?TitleInfo> {
  const id: ?string = getYoutubeId(url);
  if (!id) return undefined;

  const res: ?YoutubeResponse = await youtubeTitle(id);
  if (!res) return undefined;

  const nobotOverride = antiNobot(res);

  if (res && res.title) {
    const text = `YT (${res.uploader}): ${res.title}`;
    return { text, nobotOverride };
  }

  return undefined;
}

module.exports = {
  youtubeTitle, handleYoutube,
};
