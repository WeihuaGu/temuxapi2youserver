var { encrypt , getencryptedpass } = require('./encrypt');


const sendtoserver = (info)=>{
  const encrypted = encrypt(info); // 加密
  const encryptedaespass = getencryptedpass();
  console.log('send to server');
  console.log(encrypted);
  console.log(encryptedaespass);


}


exports.sendtoserver = sendtoserver
