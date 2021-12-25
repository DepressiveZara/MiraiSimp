module.exports.config = {
  name: "gai",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "F",
  description: "get anh gai xink",
  commandCategory: "ramdom-images",
  usages: "naughty",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  axios.get('https://github.com/meowcop/API/blob/main/GXCL.php').then(res => {
  let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
  let count = res.data.count;
  let callback = function () {
          api.sendMessage({
            body: `<3\nSố ảnh hiện có : ${count} ảnh`,
            attachment: fs.createReadStream(__dirname + `/cache/gaixinh.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/gaixinh.${ext}`), event.messageID);
        };
        request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/gaixinh.${ext}`)).on("close", callback);
      })
}