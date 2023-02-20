const redisPubSub = require('./helpers/redisPubSub');
const open = require('open');

const domain = 'https://www.th-koeln.de/';

async function main() {
  await open(domain);
  await redisPubSub.startRedis();
}

main();
