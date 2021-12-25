module.exports.config = {
  name: "tagadmin",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ZyrosGenZ, ManhG Fix",
  description: "Bot sẽ rep ng tag admin hoặc rep ng tagbot ",
  commandCategory: "Other",
  usages: "[on/off]",
  cooldowns: 3,
  dependencies: {}
};
module.exports.handleEvent = function ({ api, event }) {
  const { senderID, threadID, messageID, mentions } = event;
  const thread = global.data.threadData.get(threadID) || {};
  if (typeof thread["tagadmin"] !== "undefined" && thread["tagadmin"] == false) return;

  const listAdmin = global.config.ADMINBOT;
  const mention = Object.keys(mentions);
  if (event.senderID !== global.data.botID) {
    for (const id of listAdmin) {
      if (mention == id) {
        var msg = ["Hong bé ơi"];
         api.sendMessage({ body: msg[Math.floor(Math.random() * msg.length)] }, threadID, messageID);
         break;
      }break;
    }
  }
};

module.exports.languages = {
  "vi": { "on": "Bật", "off": "Tắt", "successText": "tagadmin thành công", },
  "en": { "on": "on", "off": "off", "successText": "success!", }
}

module.exports.run = async function ({ api, event, Threads, getText }) {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;
  if (typeof data["tagadmin"] == "undefined" || data["tagadmin"] == false) data["tagadmin"] = true;
  else data["tagadmin"] = false;
  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["tagadmin"] == true) ? getText("on") : getText("off")} ${getText("successText")}`, threadID, messageID);
}