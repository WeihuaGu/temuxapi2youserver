var { encrypt , getencryptedpass } = require('./encrypt');
const http = require('http');
const https = require('https');

// 获取环境变量 sendtermuxapiurl 的值
const termuxapiurl = process.env.sendtermuxapiurl;
const apiurl = termuxapiurl || 'https://api.example.com/post-endpoint';
const headers = {
  'Content-Type': 'application/json',
  'DecryptPass': getencryptedpass(),
  'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
};

const sendPostRequest = (url, headers, body,callback)=>{
    const options = {
      method: 'POST',
      headers: headers
    };

    const protocol = url.startsWith('https://') ? https : http;
    const request = protocol.request(url, options, response => {
      let responseData = '';
      response.on('data', chunk => {
        responseData += chunk;
      });
      response.on('end', () => {
	callback(responseData);
      });
    });
    if (body) {
      request.write(body);
    }
    request.end();

}

const sendtoserver = (info)=>{
  const encrypted = encrypt(info); // 加密
  const body = JSON.stringify({ info: encrypted });
  console.log('send to server');
  sendPostRequest(apiurl,headers,body,(res)=>{console.log(res);});
}


exports.sendtoserver = sendtoserver
