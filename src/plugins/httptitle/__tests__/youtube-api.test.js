/* @flow */

const yt = require('../youtube-api').youtubeTitle;

test('Gets correct title and uploader for given video id', (done) => {
  yt('P73REgj-3UE').then((x) => {
    if (x && x.title && x.uploader) {
      expect(x.title).toEqual('Primitive Technology: Tiled Roof Hut');
      expect(x.uploader).toEqual('Primitive Technology');
    }

    done();
  });
});
