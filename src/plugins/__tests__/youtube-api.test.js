const yt = require('../youtube-api').youtubeTitle;

test('Gets correct title and uploader for given video id', () => {
  yt('P73REgj-3UE').then((x) => {
    expect(x.title).toEqual('Primitive Technology: Tiled Roof Hut');
    expect(x.uploader).toEqual('Primitive Technology');
  });
});
