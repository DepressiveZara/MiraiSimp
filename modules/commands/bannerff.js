module.exports.config = {
    name: "bannerff",
    version: "1.0.0",
    hasPermssion: 1,
    credits: "tdunguwu",
    description: "",
    commandCategory: "banner",
    usages: "bannerlw",
    cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {

  const request = require('request');
  const fs = require("fs");
  const { threadID, messageID } = event;
	
  const text1 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[0];
  
  
var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/bannerwe.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/bannerwe.jpg"),event.messageID);
return request(encodeURI(`https://sertiojanganzapi.nasihosting.com/serti/serti2/img.php?nama=${text1}`)).pipe(fs.createWriteStream(__dirname+'/cache/bannerwe.jpg')).on('close',() => callback());     
}