module.exports.config = {
  name: "box",
  version: "1.0.3",
  hasPermssion: 0,
  credits: "pờ rồ cốt đơ lỏ",
  description: "Các cài đặt của nhóm chat.",
  commandCategory: "group",
  usages: "[id/name/setname/emoji/admin/image/info]",
  cooldowns: 1,
  dependencies: {
    "request": "",
    "fs-extra": ""
  }
};

module.exports.run = async function ({ event, api, global, Config, logger, Threads, Users, args, body, is }) {
  const axios = require('axios')
  const { writeFileSync, readFileSync, createReadStream, unlinkSync } = require("fs-extra");
  const { threadID, senderID, messageID } = event;
 const dataThread = (await Threads.getData(threadID));
  const data = dataThread.data; 
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const prefix = threadSetting.PREFIX || global.config.PREFIX;
  const { admin, exception } = Config;
  const configPath = global.dirConfig;
  const config = require(configPath);
  

  switch (args[0]) {
    case 'info':
    case '-i': {
      let threadInfo = await api.getThreadInfo(event.threadID);
      var gendernam = [];
      var gendernu = [];
      for (let z in threadInfo.userInfo) {
        var gioitinhone = threadInfo.userInfo[z].gender;
        if (gioitinhone == "MALE") {
          gendernam.push(gioitinhone)
        } else {
          gendernu.push(gioitinhone)
        }
      };
      let pathAva = __dirname + `/cache/1.png`;
      let img = (await axios.get(encodeURI(`${threadInfo.imageSrc}`), { responseType: "arraybuffer" })).data;
      writeFileSync(pathAva, Buffer.from(img, "utf-8"));

      var nam = gendernam.length;
      var nu = gendernu.length;
      let sex = threadInfo.approvalMode;
      var pd = sex == false ? "tắt" : sex == true ? "bật" : "Kh";
      if (img) {
        return api.sendMessage({ body: `=== InFo Box ===\n\n❄️ Tên nhóm: ${threadInfo.threadName}\n🧩 TID: ${event.threadID}\n🦋 Phê duyệt: ${pd}\n💸 Emoji: ${threadInfo.emoji}\n🍳 Thông tin: \n👻 ${event.participantIDs.length} thành viên và ${threadInfo.adminIDs.length} quản trị viên.\n🤷‍♀️ Gồm ${nam} nam và ${nu} nữ.\n📩 Tổng số tin nhắn: ${threadInfo.messageCount}.`, attachment: createReadStream(pathAva) }, event.threadID, () => unlinkSync(pathAva), event.messageID);
      } else { return api.sendMessage(`=== InFo Box ===\n\n❄️ Tên nhóm: ${threadInfo.threadName}\n🧩 TID: ${event.threadID}\n🦋 Phê duyệt: ${pd}\n💸 Emoji: ${threadInfo.emoji}\n🍳 Thông tin: \n🤨 Có ${event.participantIDs.length} thành viên và ${threadInfo.adminIDs.length} quản trị viên.\n🤷‍♀️ Gồm ${nam} nam và ${nu} nữ.\n📩 Tổng số tin nhắn: ${threadInfo.messageCount}.`, event.threadID, event.messageID) }
    }

    case 'id': {
      return api.sendMessage(`${event.threadID}`, event.threadID, event.messageID);
    }

    case 'emoji': {
      if (!args[1]) return api.sendMessage(`» Vui lòng nhập emoji cần đổi`, event.threadID, event.messageID);
      const name = args[1] || event.messageReply.body;
      return api.changeThreadEmoji(name, event.threadID)
    }

    case 'name': {
      if (!args[1]) return api.sendMessage(`» Vui lòng nhập tên box cẩn đổi`, event.threadID, event.messageID);
      var content = args.join(" ");
      var c = content.slice(4, 99) || event.messageReply.body;
      return api.setTitle(`${c} `, event.threadID);
    }

    case 'image':
    case 'img': {
      if (event.type !== "message_reply") return api.sendMessage("❌ Bạn phải reply một audio, video, ảnh nào đó", event.threadID, event.messageID);
      if (!event.messageReply.attachments || event.messageReply.attachments.length == 0) return api.sendMessage("❌ Bạn phải reply một audio, video, ảnh nào đó", event.threadID, event.messageID);
      if (event.messageReply.attachments.length > 1) return api.sendMessage(`Vui lòng reply chỉ một audio, video, ảnh!`, event.threadID, event.messageID);
      var callback = () => api.changeGroupImage(createReadStream(__dirname + "/cache/1.png"), event.threadID, () => unlinkSync(__dirname + "/cache/1.png"));
      return request(encodeURI(event.messageReply.attachments[0].url)).pipe(createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
      break;
    }

    case "admin":
    case "ad": {
      if (!args[1]) return api.sendMessage(`» Vui lòng thêm các tag: [add/remove] [reply/tag] để thay đổi vai trò của người đó`, event.threadID, event.messageID);
      if (args[1] == 'add') {
        if (event.type == "message_reply") {
          var uid = event.messageReply.senderID
          var name = await Users.getName(uid)
          api.changeAdminStatus(event.threadID, uid, true, editAdminsCallback)
          function editAdminsCallback(err) {
            if (err) return api.sendMessage("» Bot không đủ quyền hạn để thêm quản trị viên", event.threadID, event.messageID);
            return api.sendMessage(`» Đã thêm ${name} làm quản trị viên nhóm`, event.threadID, event.messageID);
          }
        }
        if (args.join().indexOf('@') !== -1) {
          var mentions = Object.keys(event.mentions)
          var name = await Users.getName(mentions)
          api.changeAdminStatus(event.threadID, mentions, true, editAdminsCallback)
          function editAdminsCallback(err) {
            if (err) return api.sendMessage("» Bot không đủ quyền hạn để thêm quản trị viên", event.threadID, event.messageID);
            return api.sendMessage(`» Đã thêm ${name} làm quản trị viên nhóm`, event.threadID, event.messageID);
          }
        } else return
      } else if (args[1] == 'rm' || args[1] == 'remove' || args[1] == 'del') {
        if (event.type == "message_reply") {
          var uid = event.messageReply.senderID
          var name = await Users.getName(uid)
          api.changeAdminStatus(event.threadID, uid, false, editAdminsCallback)
          function editAdminsCallback(err) {
            if (err) return api.sendMessage("» Bot không đủ quyền hạn để gỡ quản trị viên hoặc người dùng chưa là quản trị viên", event.threadID, event.messageID);
            return api.sendMessage(`» Đã gỡ vai trò quản trị viên của ${name} `, event.threadID, event.messageID);
          }
        }
        if (args.join().indexOf('@') !== -1) {
          var mentions = Object.keys(event.mentions)
          var name = await Users.getName(mentions)
          api.changeAdminStatus(event.threadID, mentions, false, editAdminsCallback)
          function editAdminsCallback(err) {
            if (err) return api.sendMessage("» Bot không đủ quyền hạn để gỡ quản trị viên hoặc người dùng chưa là quản trị viên", event.threadID, event.messageID);
            return api.sendMessage(`» Đã gỡ vai trò quản trị viên của ${name} `, event.threadID, event.messageID);
          }
        }
      }
    }
    //---> BOX ONLY <---//
    case "only":
      {
        //---> Do not reply no admin <---//
        if (senderID != Config.admin.find(item => item == senderID)) return api.sendMessage(`» [ADMIN] Bạn không có quyền sử dụng "box only".`, threadID);
        //---> CODE <---//
        const idThreadOnly = config.boxOnly.find(item => item == threadID)
        if (config.boxOnly != idThreadOnly) {
          config.boxOnly = threadID;
          api.sendMessage("» [BOX] Bật chế độ chỉ nhóm này mới có thể sử dụng bot.", threadID, messageID);
        } else {
          const idThreadOnly = config.boxOnly.findIndex(i => i.toString() == threadID);
          Config.boxOnly.splice(data, 1);
          config.boxOnly.splice(data, 1);
          api.sendMessage("» [BOX] Tắt chế độ chỉ nhóm được duyệt mới có thể sử dụng bot.", threadID, messageID);
        }
        writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
        break;
      }
    //---> QTV BOX ONLY <---//
    case "onlyqtv":
    case "qtvonly":
      {
        if (event.threadID != event.senderID) {
          const dataOfThread = (await Threads.getData(event.threadID)).data;
          var onlyQTV = dataOfThread.onlyQTV;
          if (!dataOfThread.onlyQTV) {
            dataOfThread.onlyQTV = false;
            await Threads.setData(event.threadID, { data: dataOfThread })
          }
        }
        //---> Do not reply no listQTV <---//
        var idAD = [];
        var threadInfo = await api.getThreadInfo(event.threadID);
        var adminIDs = threadInfo.adminIDs;
        for (let i = 0; i < adminIDs.length; i++) {
          idAD.push(adminIDs[i].id);
        }
        const listAdmin = Config.admin.find(item => item == senderID);
        const listQTV = idAD.find(item => item == senderID);

        if (!listAdmin && !listQTV) return api.sendMessage(`» [QTV] Bạn không được phép sử dụng lệnh "box qtvonly".`, threadID);

        //---> CODE <---//
        var dataOfThread = (await Threads.getData(threadID)).data;
        if (dataOfThread.onlyQTV == false) {
          dataOfThread.onlyQTV = true;
          Threads.setData(threadID, { data: dataOfThread });
          return api.sendMessage("» [QTV BOX] Bật chế độ chỉ quản trị viên nhóm mới có thể sử dụng bot.", threadID, messageID);
        }
        else {
          dataOfThread.onlyQTV = false;
          Threads.setData(threadID, { data: dataOfThread });
          return api.sendMessage("» [QTV BOX] Tắt chế độ chỉ quản trị viên nhóm mới có thể sử dụng bot.", threadID, messageID);
        }
      }
    //---> QTV All BOX ONLY <---//
    case "allonly":
    case "qtvonlyall":
    case "allqtvonly":
    case "onlyallqtv":
      {
        //---> Do not reply no listQTV <---//
        var idAD = [];
        var threadInfo = await api.getThreadInfo(event.threadID);
        var adminIDs = threadInfo.adminIDs;
        for (let i = 0; i < adminIDs.length; i++) {
          idAD.push(adminIDs[i].id);
        }
        const listAdmin = Config.admin.find(item => item == senderID);
        const listQTV = idAD.find(item => item == senderID);

        if (!listAdmin && !listQTV) return api.sendMessage(`» [QTV] Bạn không được phép sử dụng lệnh "box onlyallqtv".`, threadID);
        //---> CODE <---//
        if (config.allQTVOnly == false) {
          config.allQTVOnly = true;
          api.sendMessage("» [QTV ALL BOX] Bật chế độ chỉ quản trị viên nhóm mới có thể sử dụng bot.", threadID, messageID);
        } else {
          config.allQTVOnly = false;
          api.sendMessage("» [QTV ALL BOX] Tắt chế độ chỉ quản trị viên nhóm mới có thể sử dụng bot.", threadID, messageID);
        }
        writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
        break;
      }
    default:
      return api.sendMessage(`𝘽𝙖̣𝙣 𝙘𝙤́ 𝙩𝙝𝙚̂̉ 𝙙𝙪̀𝙣𝙜:\n1. ${prefix}box emoji [icon]\n2. ${prefix}box name [tên box cần đổi]\n3. ${prefix}box image [rep một ảnh bất kì cần đặt thành ảnh box]\n4. ${prefix}box admin add/remove [reply/tag] => nó sẽ đưa/xoá qtv người được tag\n5. ${prefix}box id => Lấy ID nhóm\n6. ${prefix}box info => Toàn bộ thông tin của nhóm!\n 𝘼𝙙𝙢𝙞𝙣:\n7. ${prefix}box only -> BOX ONLY\n8. ${prefix}box onlyqtv/qtvonly -> QTV BOX ONLY\n9. ${prefix}box allqtvonly/qtvonlyall -> QTV ALL BOX ONLY`, event.threadID, event.messageID);
  }
}