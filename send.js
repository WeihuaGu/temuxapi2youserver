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
    		// 处理响应
		callback(response.data);
  	})
  	.catch(error => {
    	// 处理错误
    	console.error(error);
  	});

}

const sendtoserver = (info)=>{
  const encrypted = encrypt(info); // 加密
  const body = JSON.stringify({ info: encrypted.encryptedcontent });
  console.log('send to server');
  headers['DecryptPass'] = encrypted.encryptedpass;
  sendPostRequest(apiurl,headers,body,(res)=>{console.log(res);});
}


exports.sendtoserver = sendtoserver
