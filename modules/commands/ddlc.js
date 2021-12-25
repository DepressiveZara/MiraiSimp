module.exports.config = {
    name: "ddlc",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "tdunguwu",
    description: "",
    commandCategory: "image",
    cooldowns: 0,
    dependencies: {
        "fs-extra": "",
        "request": ""
    }
};
module.exports.run = async ({ api, event,args }) => {  {
    
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
	 const { threadID, messageID, senderID, body } = event;
	let text = args.join(" ")
  if (!text) return api.sendMessage('Vui lòng nhập đúng định dạng [monika, yuri, natsuki, sayori or m, y, n , s | bedroom, class, closet, club, corridor, house, kitchen, residential, sayori_bedroom | text]!', event.threadID, event.messageID);

 const text1 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[0];
 if (!text1) return api.sendMessage('Vui lòng nhập đúng định dạng [monika, yuri, natsuki, sayori or m, y, n , s | bedroom, class, closet, club, corridor, house, kitchen, residential, sayori_bedroom | text]!', event.threadID, event.messageID);
const text2 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[1];
if (!text2) return api.sendMessage('Vui lòng nhập đúng định dạng [monika, yuri, natsuki, sayori or m, y, n , s | bedroom, class, closet, club, corridor, house, kitchen, residential, sayori_bedroom | text]!', event.threadID, event.messageID);
 const text3 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[2];
 if (!text3) return api.sendMessage('Vui lòng nhập đúng định dạng [monika, yuri, natsuki, sayori or m, y, n , s | bedroom, class, closet, club, corridor, house, kitchen, residential, sayori_bedroom | text]!', event.threadID, event.messageID);
	 var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/ddlc.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/ddlc.png"),event.messageID);
	 return request(encodeURI(`https://api-ttk.herokuapp.com/other/ddlc?character=${text1}&background=${text2}&text=${text3}`)).pipe(fs.createWriteStream(__dirname+'/cache/ddlc.png')).on('close',() => callback());     
}}
