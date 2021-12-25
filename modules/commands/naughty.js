module.exports.config = {
  name: "naughty",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "F",
  description: "Xem ảnh nhưng vip",
  commandCategory: "ramdom-images",
  usages: "naughty",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  axios.get('https://zyros.glitch.me/naughty_rabbit').then(res => {
  let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
  let count = res.data.count;
  let callback = function () {
          api.sendMessage({
            body: `<3\n〉Xinkdepvjppro ☻`,
            attachment: fs.createReadStream(__dirname + `/cache/naughty.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/naughty.${ext}`), event.messageID);
        };
        request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/naughty.${ext}`)).on("close", callback);
      })
}