const Discord = require("discord.js");
const { exec } = require("child_process");
const config = require("./config.json")
const { existsSync, readFileSync } = require('fs');
const axios = require('axios');
const PREFIX = config.prefix;
const ROOT = "botServers"
const client = new Discord.Client({
  intents: 32767,
});

client.on("ready", async () => {
  let fileToRead;
  try {
    fileToRead = await readFileSync('/home/runner/.pm2/dump.pm2',
      { encoding: 'utf8' });
  } catch {
    console.log("tried to read the dump.pm2 file, but failed to")
  }
  setInterval(async () => {
    try {
      fileToRead = await readFileSync('/home/runner/.pm2/dump.pm2',
        { encoding: 'utf8' });
    } catch {
      console.log("tried to read the dump.pm2 file, but failed to")
    }
  }, 1000 * 30)

  // load new copy
  if (
    !existsSync("/home/runner/.pm2/dump.pm2") ||
    fileToRead.length === 2
  ) {
    await exec(
      "npx pm2 -h",
      (error, stdout, stderr) => {
        if (error) throw new Error(error);

        console.log(`EXECUTED PM2 help. stdout: ${stdout}`);
        console.log(`EXECUTED PM2 help. stderr: ${stderr}`);
      }
    );
    await exec(
      "npx pm2 save --force",
      (error, stdout, stderr) => {
        if (error) throw new Error(error);

        console.log(`EXECUTED PM2 SAVE. stdout: ${stdout}`);
        console.log(`EXECUTED PM2 SAVE. stderr: ${stderr}`);
      }
    );


    await exec(
      `cp /home/runner/${config.filename}/pm2files/dump.pm2 /home/runner/.pm2/`,
      (error, stdout, stderr) => {
        if (error) throw new Error(error);

        console.log(`LOADED NEW COPY OF dump.pm2. stdout: ${stdout}`);
        console.log(`LOADED NEW COPY OF dump.pm2. stderr: ${stderr}`);
      }
    );

    await exec(
      `cp /home/runner/${config.filename}/pm2files/dump.pm2.bak /home/runner/.pm2/`,
      (error, stdout, stderr) => {
        if (error) throw new Error(error);

        console.log(`LOADED NEW COPY OF dump.pm2. stdout: ${stdout}`);
        console.log(`LOADED NEW COPY OF dump.pm2. stderr: ${stderr}`);
      }
    );

    await exec(
      "npx pm2 resurrect",
      (error, stdout, stderr) => {
        if (error) throw new Error(error);

        console.log(`EXECUTED PM2 RESURRECT. stdout: ${stdout}`);
        console.log(`EXECUTED PM2 RESURRECT. stderr: ${stderr}`);
      }
    );
  }

  setInterval(async () => {
    if (
      !existsSync("/home/runner/.pm2/dump.pm2") ||
      fileToRead.length === 2
    ) {
      await exec(
        "npx pm2 -h",
        (error, stdout, stderr) => {
          if (error) throw new Error(error);

          console.log(`EXECUTED PM2 help. stdout: ${stdout}`);
          console.log(`EXECUTED PM2 help. stderr: ${stderr}`);
        }
      );
      await exec(
        "npx pm2 save --force",
        (error, stdout, stderr) => {
          if (error) throw new Error(error);

          console.log(`EXECUTED PM2 SAVE. stdout: ${stdout}`);
          console.log(`EXECUTED PM2 SAVE. stderr: ${stderr}`);
        }
      );


      await exec(
        `cp /home/runner/${config.filename}/pm2files/dump.pm2 /home/runner/.pm2/`,
        (error, stdout, stderr) => {
          if (error) throw new Error(error);

          console.log(`LOADED NEW COPY OF dump.pm2. stdout: ${stdout}`);
          console.log(`LOADED NEW COPY OF dump.pm2. stderr: ${stderr}`);
        }
      );

      await exec(
        `cp /home/runner/${config.filename}/pm2files/dump.pm2.bak /home/runner/.pm2/`,
        (error, stdout, stderr) => {
          if (error) throw new Error(error);

          console.log(`LOADED NEW COPY OF dump.pm2. stdout: ${stdout}`);
          console.log(`LOADED NEW COPY OF dump.pm2. stderr: ${stderr}`);
        }
      );

      await exec(
        "npx pm2 resurrect",
        (error, stdout, stderr) => {
          if (error) throw new Error(error);

          console.log(`EXECUTED PM2 RESURRECT. stdout: ${stdout}`);
          console.log(`EXECUTED PM2 RESURRECT. stderr: ${stderr}`);
        }
      );
    }
  }, 1000 * 60 * 5);

  // copy the dump files
  setInterval(async () => {
    await exec(
      `cp /home/runner/.pm2/dump.pm2 /home/runner/${config.filename}/pm2files/dump.pm2`,
      (error, stdout, stderr) => {
        if (error) throw new Error(error);

        console.log(`BACKED UP dump.pm2. stdout: ${stdout}`);
        console.log(`BACKED UP dump.pm2. stderr: ${stderr}`);
      }
    );

    await exec(
      `cp /home/runner/.pm2/dump.pm2.bak
/home/runner/${config.filename}/pm2files/dump.pm2.bak`,
      (error, stdout, stderr) => {
        if (error) throw new Error(error);

        console.log(`BACKED UP dump.pm2. stdout: ${stdout}`);
        console.log(`BACKED UP dump.pm2. stderr: ${stderr}`);
      }
    );
  }, 1000 * 5 * 60);



  setTimeout(async () => {
    await exec(`npx pm2 save`, function(error, stdout, stderr) {
      if (error) {
        throw new Error(error);
      }
      console.log(`EXECUTED PM2 SAVE. stdout: ${stdout}`);
      console.log(`EXECUTED PM2 SAVE. stderr: ${stderr}`);
    })
  }, 1000 * 5 * 60)
  setInterval(async () => {
    await exec(`npx pm2 save`, function(error, stdout, stderr) {
      if (error) {
        throw new Error(error);
      }
      console.log(`EXECUTED PM2 SAVE. stdout: ${stdout}`);
      console.log(`EXECUTED PM2 SAVE. stderr: ${stderr}`);
    });
  }, 1000 * 5 * 60);
});

client.on("messageCreate", async (msg) => {
  if (msg.channel.id == process.env.CONSOLECH || config.console && !msg.author.bot && msg.webhookId == null) {
    const web = new Discord.WebhookClient({ id: '946840351606452234', token: 'StbYgJx19dT9MIXQnmE_DzmdtmiE8U3_gBRkPp-w7Ae_iSMr5WHADytQRD-jlZOe5uxA' })
    if(!(msg && msg.embeds && Array.isArray(msg.embeds) && msg.embeds.length <= 0 && msg.content && msg.content !== '')) return;
    const _console = exec(`${msg.content}`)
    _console.stdout.on("data", (data) => {
      web.send(`${data}`).catch(() => { })
    })
    _console.stderr.on("resize", (data) => {
      web.send(`${data ? data : null}`).catch(() => { })
    })
    _console.stdin.on("data", (data) => {
      web.send(`${data}`).catch(() => { })
    })
  }
});
client.login(process.env.TOKEN || config.token);
client.on("presenceUpdate", async (op, np) => {
  if (np.status == "offline" && np.user.bot) {
    axios({
      method: "get",
      url: `${process.env.BOTMAKERAPI || config.botmakerapi}cheakbot`,
      data: {
        botid: np.user.id
      }
    }).then(res => {
      const data = res.data;
      console.log(np.user.id + "::" + np.user.username)
      console.log(data)
      if (!data.bot) return;
      const dirtostart = data.db.path
        .split(`/home/runner/${config.filename}`).join('')
      pm2Restart(dirtostart)
    })
  }
})
/*function pm2Restart(dir){
  const userID = dir.split('/')[1],
    servername = dir.split('/')[3]
  console.log(`Started ${dir}/index.js as ${userID}/${servername}`)
  exec(`npx pm2 start ${dir}/index.js --name ${userID}/${servername}`)
}*/