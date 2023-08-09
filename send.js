var { encrypt } = require('./encrypt');


const sendtoserver = (info)=>{
  const crypted = encrypt(info); // 加密
  console.log('send to server');
  console.log(crypted);


}


exports.sendtoserver = sendtoserver
