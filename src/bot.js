// @flow

// TODO: move to options file?
const options = {
  channels: [
    '#dota.hamachi',
    '#sosetest',
  ],

  serverOptions: {
    host: 'se.quakenet.org',
    port: 6667,
    nick: 'nobot',
    username: 'sobot is nobot',
    version: 'sobot',
    encoding: 'utf8',
    auto_reconnect: true,
    auto_reconnect_wait: 6000,
    auto_reconnect_max_retries: 100,
    ping_interval: 30,
    ping_timeout: 120,
  },

  log: {
    severity: -1000,
  },
};

const IRC = require('irc-framework');

const bot = new IRC.Client();

const log = require('./util/logging').log;

// TODO: separate file?
const weatherPlugin = require('./plugins/weather');
const titlePlugin = require('./plugins/httptitle');
const waPlugin = require('./plugins/wolframalpha');

const plugins = [
  weatherPlugin,
  titlePlugin,
  waPlugin,
];


bot.on('registered', (event) => {
  log(`Registered with nick ${event.nick}.`);

  options.channels.forEach(channel => bot.join(channel));
});

bot.on('message', (event) => {
  const { message, reply } = event;

  // TODO
  log(`timestamp? ${message}`, 0);

  for (const plugin of plugins) {
    plugin.handle(message, reply);
  }
});

bot.on('reconnecting', (event) => {
  log(`reconnecting.. ${event}`, 0);
});

bot.on('socket close', (event) => {
  log(`socket close. ${event}`, 0);
});

bot.on('close', (event) => {
  log(`close event. ${event}`, 0);
});

bot.connect(options.serverOptions);
