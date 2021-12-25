module.exports.config = {
    name: "blackpk",
    version: "1.0.0",
    hasPermssion: 1,
    credits: "tdunguwu",
    description: "tao banner tren api lawerpr0ject",
    commandCategory: "banner",
    usages: "bannerlw",
    cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const axios = require('axios');
  const request = require('request');
  	const fs = require("fs"); 
  const { threadID, messageID } = event;
		const res = await axios.get(`https://randomlinkapi.wanttoluv.repl.co/getLink1`); 
	let key = res.data.data;
 if (`hwangngu` != `${key}`) { console.log('\x1b[33m[ WARN ]\x1b[37m » có key chưa nhóc con đjt mẹ mày luôn đấy con chó:))');        return api.sendMessage('[ WARN ] Phát hiện người điều hành bot ' + global.config.BOTNAME + ' leak modules "' + this.config.name + '"', threadID, messageID);      }  
 else {
  const text1 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[0];
var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/bannerwe.jpeg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/bannerwe.jpeg"),event.messageID);
	 return request(encodeURI(`https://api-alphabot.herokuapp.com/api/textpro/blackpink?text=${text1}&apikey=Alphabot`)).pipe(fs.createWriteStream(__dirname+'/cache/bannerwe.jpeg')).on('close',() => callback());     
}}