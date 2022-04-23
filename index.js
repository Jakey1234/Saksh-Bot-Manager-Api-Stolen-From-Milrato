
console.log("Child process")
const {exec} = require("child_process");

const {copyFile,existsSync} = require("fs");
// const pm2process = exec("npx pm2 start all");
const Discord = require("discord.js")
const webh = new Discord.WebhookClient({id: '946840351606452234', token: 'StbYgJx19dT9MIXQnmE_DzmdtmiE8U3_gBRkPp-w7Ae_iSMr5WHADytQRD-jlZOe5uxA'})

require("./server/index.js")
require("./bot.js")

process.on('unhandledRejection', (reason, p) => {
  console.log(' 🚩 [antiCrash] >> Unhandled Rejection/Catch');
  console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  console.log(' 🚩 [antiCrash] >> Uncaught Exception/Catch');
  console.log(err, origin);
}) 
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log(' 🚩 [antiCrash] >> Uncaught Exception/Catch (MONITOR)');
   console.log(err, origin);
  });
process.on('multipleResolves', (type, promise, reason) => {
  console.log(' 🚩 [antiCrash] >> Multiple Resolves');
  console.log(type, promise, reason);
})