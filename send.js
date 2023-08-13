var { encrypt } = require('./encrypt');
const axios = require('axios');

// 获取环境变量 sendtermuxapiurl 的值
const termuxapiurl = process.env.sendtermuxapiurl;
const apiurl = termuxapiurl || 'http://localhost:4000/tool/echo';
const headers = {
  'content-type':'application/json',
  'authorization':'YOUR_SERVER_ACCESS_TOKEN'
};

const sendPostRequest = (url, headers, body, callback)=>{
    axios.post(url, body, { headers })
  	.then(response => {
		callback(null,response.data);
  	})
  	.catch(error => {
		callback(error,null);
  	});

}

const sendtoserver = (info)=>{
  const encrypted = encrypt(info); // 加密
  const body = JSON.stringify({ decryptpass:encryptedpass,info: encrypted.encryptedcontent });
  console.log(info);
  sendPostRequest(apiurl,headers,body,(res)=>{console.log('sended to server')});
}


exports.sendtoserver = sendtoserver
