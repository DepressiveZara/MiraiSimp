module.exports.config = {
  name: "pin2",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "tdunguwu",
  description: "",
  commandCategory: "Other",
  usages: "",
    cooldowns: 0,
};
module.exports.run = async function({ api, event, args }) {
    const axios = require("axios")
    const request = require("request")
    const fs = require("fs-extra")
    let type = args.join(" ");
    if (!type) {
        return api.sendMessage("Thiếu từ khoá", event.threadID);
    }
    const res = await axios.get(`http://api-ttk.herokuapp.com/social/pinterest?text=${encodeURIComponent(type)}&apikey=ttk`);
    var data = res.data.result;
    var msg = [];
    let img1 = `${res.data.result[0]}`;
    let img2 = `${res.data.result[1]}`;
    let img3 = `${res.data.result[2]}`;
    let img4 = `${res.data.result[3]}`;
    let img5 = `${res.data.result[4]}`;
	let img6 = `${res.data.result[5]}`;
	let img7 = `${res.data.result[6]}`;
	let img8 = `${res.data.result[7]}`;
	let img9 = `${res.data.result[8]}`;

    let imgs1 = (await axios.get(`${img1}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img1.jpg", Buffer.from(imgs1, "utf-8"));
    let imgs2 = (await axios.get(`${img2}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img2.jpg", Buffer.from(imgs2, "utf-8"));
    let imgs3 = (await axios.get(`${img3}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img3.jpg", Buffer.from(imgs3, "utf-8"));
    let imgs4 = (await axios.get(`${img4}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img4.jpg", Buffer.from(imgs4, "utf-8"));
    let imgs5 = (await axios.get(`${img5}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img5.jpg", Buffer.from(imgs5, "utf-8"));
	let imgs6 = (await axios.get(`${img6}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img6.jpg", Buffer.from(imgs6, "utf-8"));
	let imgs7 = (await axios.get(`${img7}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img7.jpg", Buffer.from(imgs7, "utf-8"));
	let imgs8 = (await axios.get(`${img8}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img8.jpg", Buffer.from(imgs8, "utf-8"));
	let imgs9 = (await axios.get(`${img9}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img9.jpg", Buffer.from(imgs9, "utf-8"));

    var allimage = [];
    allimage.push(fs.createReadStream(__dirname + "/cache/img1.jpg"));
    allimage.push(fs.createReadStream(__dirname + "/cache/img2.jpg"));
    allimage.push(fs.createReadStream(__dirname + "/cache/img3.jpg"));
    allimage.push(fs.createReadStream(__dirname + "/cache/img4.jpg"));
    allimage.push(fs.createReadStream(__dirname + "/cache/img5.jpg"));
	allimage.push(fs.createReadStream(__dirname + "/cache/img6.jpg"));
	allimage.push(fs.createReadStream(__dirname + "/cache/img7.jpg"));
	allimage.push(fs.createReadStream(__dirname + "/cache/img8.jpg"));
	allimage.push(fs.createReadStream(__dirname + "/cache/img9.jpg"));
	
    {
        msg += `ảnh ${type} của bạn đây`
    }
    
    return api.sendMessage({
        body: msg,
        attachment: allimage
    }, event.threadID);
}