module.exports = {
  apps : [{
    name: `CLANBOT_${require('path').resolve(__dirname).split("/")[4]}`,
    script: 'index.js',
//    max_restarts: 5,
    cron_restart: "0 1 * * *"
  }]
};
