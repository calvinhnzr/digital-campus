const redisPubSub = require('./helpers/redisPubSub')
const Browser = require('./helpers/browserAutomation')
require("dotenv").config({path:__dirname + '/../.env'});

const host = process.env.DEPLOYED
const room = process.env.ROOM

const domain = `https://${host}/display/campus/Gummersbach/rooms/${room}`

const browser = new Browser(domain)
browser.openBrowser(domain)

async function openSchedule(){
  await browser.refresh()
  console.log('Refreshed display');
}

async function main() {
  await redisPubSub.startRedis();

  redisPubSub.publishEvent("piStarted", {room});


  redisPubSub.onMessage('newToken', async (payload) => {
    if(payload.room === room){
      console.log(`New token = ${payload.token}`);
      console.log('Token has been added to NFC Tag')
      await openSchedule();
    }
  })

  redisPubSub.onMessage('refreshDisplay', async (payload) => {
    if(payload.room === room){
      await openSchedule();
    }
  })
}

main();
