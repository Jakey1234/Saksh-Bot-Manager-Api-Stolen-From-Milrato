const fs = require('fs'), cp = require('child_process'), readline = require('readline');
const { stdin: input, stdout: output } = require('process'), subfiles = fs.readdirSync("./");

(async () => {
  for(const subfile of subfiles){
    if(!fs.lstatSync(`./${subfile}`).isDirectory()) continue; 
    var files = fs.readdirSync(`./${subfile}`);
    for(const file of files) {
      try {
        const path = `${process.cwd()}/${subfile}/${file}`;
        if(!fs.lstatSync(path).isDirectory()) continue; 
        if(["SHOPBOT", "template", "node_modules", "toupdate"].some(d => path.includes(d))) continue; 
        await new Promise((res) => setTimeout(()=>res(2), 100)); // wait some time
        const botName = path.split("/")[path.split("/").length - 1].split("\"").join("");
        await checkBot(path, botName);
      } catch (e){ console.error(e); }
    }
  }
})();
    const cp = require("child_process")
cp.exec("free -h;", (e, stdout, stderr) => message.reply(`\`\`\`${stdout}\`\`\``))

async function checkBot(path, botName) {
  return new Promise((res, rej) => {
    cp.exec(`pm2 ls | grep --ignore-case ${botName}`, async (err, stdout, stderr) => {
      if (err) { 
        await askValidation(path); return res(true);
      } else {
        console.log(`Keeping: ${path} | ${stdout ? "GOT STDOUT!" : "GOT NOT STDOUT [CHECK MANUAL]!!"}`); return res(true);
      }
    });
  })
}
async function askValidation(path){
    return new Promise((res, rej) => {
       // you could ask via prompt, or not..
       console.log(`Deleting: ${path}`)
       cp.exec(`rm '${path}' -rf`, (err, stdout, stderr) => {
           if(err) console.error(err); if(stderr) console.error(stderr);
           else console.log(`DELETED: ${path}\n\n\n\n\n`); return res(true);
       })
    })
}