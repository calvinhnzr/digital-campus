const Redis = require("ioredis");

// config local (redis instance running in docker container)
// const redisSub = new Redis({ port: 6379, host: "localhost"});
// const redisPub = new Redis({ port: 6379, host: "localhost"});
// config docker
const redisSub = new Redis({ port: 6379, host: "redis" });
const redisPub = new Redis({ port: 6379, host: "redis" });
// config pi (host is subject to change, based on ip in local network)
// const redisSub = new Redis({ port: 6379, host: "192.168.100.111"});
// const redisPub = new Redis({ port: 6379, host: "192.168.100.111"});

// config
const thisService = "auth_service";
const channel = "campusGummersbach";

// connect to channel and publish hello world message
async function startRedis() {
  await redisSub.subscribe(channel, (err, count) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`subscribed to ${channel}`);
    }
  });

  onMessage("serviceStart", (payload) => {
    console.log(payload.message);
  });
  publishEvent("serviceStart", { message: `Hello World! >>${thisService}<< has now started` });
}

// publish event to channel
// IMPORTANT: payload needs to be a js-object(don't put the key in "")
// publishEvent('event42', {foo: "bar", two: "zwei"}) = CORRECT
// publishEvent('event42'. {"foo": "bar", "two": "zwei"}) = WRONG / Causes bug on JSON.parse later on
function publishEvent(eventType, payload) {
  redisPub.publish(
    channel,
    JSON.stringify({
      type: eventType,
      payload: payload,
    })
  );
}

// listen to channel for events
function onMessage(eventType, callback) {
  redisSub.on("message", (channel, message) => {
    const receivedMessage = JSON.parse(message);

    if (receivedMessage.type === eventType) {
      callback(receivedMessage.payload);
    }
  });
}

module.exports = { startRedis, publishEvent, onMessage };
