/* @flow */

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
const weatherPlugin : Plugin = require('./plugins/weather');
const titlePlugin : Plugin = require('./plugins/httptitle/httptitle');
const waPlugin : Plugin = require('./plugins/wolframalpha');

const plugins : Array<Plugin> = [
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
  log(`msg: ${message}`, 0);

  for (const plugin of plugins) {
    plugin.handle(message).then((replies: Array<string>) => {
      for (const line of replies) {
        if (line) reply(line);
      }
    }).catch(() => log);
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
