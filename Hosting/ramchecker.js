const os = require("os");
const cp = require("child_process");
/**
 * SETTINGS
 */
const maxUsage = 80; // not more then 80% of ram usage;
const pm2_ID = 2; // pm2 id to stop;
const delayToStart = 3_000; // after x ms to start when stopped
const IntervalCheckDelay = 60_000; // check every x ms the ram 

/**
 * Script to check the ram usage
 */
function CheckRam() {
  const freemem = Math.floor(Number(os.freemem() / (1024*1024)));
  const totalmem = Math.floor(Number(os.totalmem() / (1024*1024)));
  const usedmem = Math.floor(Number(totalmem - freemem));
  const Ramusage = (usedmem / totalmem * 100).toFixed(2);
  const logString = ` [::] ${getDateTimeString()} [::]`
  console.log(`${logString} Current Ram Usage: ${Ramusage}% [ ${(usedmem / 1024).toFixed(2)}gB / ${(totalmem / 1024).toFixed(2)} gB ]`);
  if(Ramusage > maxUsage) {
    exec(`pm2 stop ${pm2_ID}`); // stop process
    setTimeout(() => exec(`pm2 start ${pm2_ID}`), delayToStart); // start again
  }
  setTimeout(() => CheckRam(), IntervalCheckDelay) // loop over the function
}
CheckRam();

function exec(CMD) {
  cp.exec(CMD, (err, stdout, stderr) => { 
    if(err) console.error(err); 
    if(stderr) console.error(stderr); 
    if(stdout) console.log(`${logString} Stopped ${pm2_ID}`);
  });
}

// Util function
function getDateTimeString (timestamp = Date.now()) {
  const date = new Date(timestamp);
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const DD = set2string(date.getDate()); //The Day
  const MM = set2string(date.getMonth() + 1); //The Month
  const HH = set2string(date.getHours()); //Hours
  const mm = set2string(date.getMinutes()); //Minutes
  const ss = set2string(date.getSeconds()); //Seconds
  return `${days[date.getDay()]} ${DD}/${MM} ${HH}:${mm}:${ss}`
}
function set2string (n) {
  if(!n) return "00"; // Returning so it doesn't crash
  return (n < 10 ? '0' : '') + n;
}