module.exports.config = {
    name: "finduid",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "tdunguwu",
    description: "tim id fb cua moi thu UvU",
    commandCategory: "Other",
    usages: "[sdt]",
    cooldowns: 5
};
module.exports.run = async function ({ api, event, args, utils  })  {
const axios = global.nodemodule['axios'];  	
const link = args.join(" ");
if (!link) return api.sendMessage('nhập link fb vào đi đcm', event.threadID, event.messageID)
try {
const res = await axios.get(`https://www.taoanhdep.tk/finduid?url=${link}`);
const sdtt = res.data.id;

return api.sendMessage(`» ${sdtt}`, event.threadID, event.messageID)
} catch {
            return api.sendMessage('không tìm thấy số điện thoại', event.threadID, event.messageID);
        }
}