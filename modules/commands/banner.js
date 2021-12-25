module.exports.config = {

    name: "bannerall",

    version: "0.0.1",

    hasPermssion: 0,

    credits: "tdunguwu",

    description: "",

    commandCategory: "banner",

    cooldowns: 0,

    dependencies: {

        "fs-extra": "",

		"axios": "",

        "request": ""    }

};

module.exports.run = async ({ event, api, global, Config, logger, Threads, Users, args, body, is }) => {

var ag = args.join(" ").split(" - ");
var text1 = ag[0],
    text2 = ag[1],
	text3 = ag[2];
	
const axios = require('axios');
const request = require('request');
const fs = require('fs-extra');
	if (args[0] == "naruto") {
		const res = await axios.get(`https://api-ttk.herokuapp.com/banner/naruto?text=${text2}&apikey=lawerteam`);
  let url = res.data.url;
var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/bannerwe.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/bannerwe.jpg"),event.messageID);
return request(encodeURI(`${url}`)).pipe(fs.createWriteStream(__dirname+'/cache/bannerwe.jpg')).on('close',() => callback());     
}
else if (args[0] == "cf") {
	let callback = function() {
                    api.sendMessage({
                        attachment: fs.createReadStream(__dirname + `/cache/crossfire1.png`)
                    }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/crossfire1.png`), event.messageID);
                };
                return request(encodeURI(`https://api-ttk.herokuapp.com/banner/crossfire?text=${text2}`))
                    .pipe(fs.createWriteStream(__dirname + `/cache/crossfire1.png`))
                    .on("close", callback);
            }
else if (args[0] == "smoke") {
	 const res = await axios.get(`https://api-ttk.herokuapp.com/banner/smoketext?text=${text2}`);
  let url = res.data.url;
var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/uwu.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/uwu.jpg"),event.messageID);
return request(encodeURI(`${url}`)).pipe(fs.createWriteStream(__dirname+'/cache/uwu.jpg')).on('close',() => callback());     
}
else if (args[0] == "pubg") {
	let text = args.join(" ")
var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/pubg1.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/pubg1.jpg"),event.messageID);
	 return request(encodeURI(`https://api-ttk.herokuapp.com/banner/pubg?text1=${text2}&text2=${text3}&apikey=lawerteam`)).pipe(fs.createWriteStream(__dirname+'/cache/pubg1.jpg')).on('close',() => callback());     
}
else if (args[0] == "tiktok") {
		const res = await axios.get(`https://api.reiyuura.me/api/photooxy/tiktok-effect?text1=${text2}&text2=${text3}`);
  let url = res.data.result.url;
var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/bannerwe.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/bannerwe.jpg"),event.messageID);
return request(encodeURI(`${url}`)).pipe(fs.createWriteStream(__dirname+'/cache/bannerwe.jpg')).on('close',() => callback());     
}
else if (args[0] == "neon") {
	const res = await axios.get(`https://api.reiyuura.me/api/photooxy/neon?q=${text2}`);
  let url = res.data.result.url;
var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/bannerwe.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/bannerwe.jpg"),event.messageID);
return request(encodeURI(`${url}`)).pipe(fs.createWriteStream(__dirname+'/cache/bannerwe.jpg')).on('close',() => callback());     
}
else if (args[0] == "lmes") {
	const res = await axios.get(`https://api.reiyuura.me/api/photooxy/love-message?q=${text2}`);
  let url = res.data.result.url;
var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/bannerwe.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/bannerwe.jpg"),event.messageID);
return request(encodeURI(`${url}`)).pipe(fs.createWriteStream(__dirname+'/cache/bannerwe.jpg')).on('close',() => callback());     
}
}