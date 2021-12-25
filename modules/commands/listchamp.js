module.exports.config = {
	name: "listchamp",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "tdunguwu",
	description: "xem thong so champ uwu",
	commandCategory: "Other",
	usages: "",
	cooldowns: 5,
	dependencies: {"axios" : ""}

	
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
	const { threadID, messageID, senderID, body } = event;

axios.get(`https://api-ttk.herokuapp.com/lmht/list`).then(res => {
      var count = res.data.champ_names;
      var data = res.data.champ_names
      var page = 1;
      page = parseInt(args[1]) || 1;
      page < -1 ? page = 1 : "";
      var limit = 15;
      var numPage = Math.ceil(count/limit);
      var msg = ``;
      for(var i = limit*(page - 1); i < limit*(page-1) + limit; i++){
         if(i >= count) break;
        msg += `[ ${i+1} ] - ${data[i]}\n`;
      }
      msg += `Trang (${page}/${numPage})\nDùng ${global.config.PREFIX}${this.config.name} list <số trang>`;
      return api.sendMessage(msg, threadID,messageID);
    });
  }