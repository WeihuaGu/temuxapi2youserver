const crypto = require('crypto');
const stringRandom = require('string-random');
const key = require('./key');
var aes_encrypt = (text, key, iv) =>{
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}
var gen_pass = ()=>{
    const pass = stringRandom(32);
    const iv = stringRandom(16);
    return {
	    pass:pass,
	    iv:iv
    }
}

var getencryptedpass = (pass,iv)=>{
	const passencrypted = crypto.publicEncrypt(key.pubKey, Buffer.from(pass+iv));
	return passencrypted.toString('base64');
}
exports.encrypt = (data) => {
 const passandiv = gen_pass();
 const aesencrypted = aes_encrypt(data,passandiv.pass,passandiv.iv);
 return {
	 encryptedpass:getencryptedpass(passandiv.pass,passandiv.iv),
	 encryptedcontent:aesencrypted
 }
};



//以下是解密函数的示例，本项目并不使用，用于服务端解密之参考
exports.decrypt = (encryptedText, key, iv) => {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
exports.decryptWithPrivateKey = (privateKey, encryptedText) => {
  const buffer = Buffer.from(encryptedText, 'base64');
  const decrypted = crypto.privateDecrypt(privateKey, buffer);
  return decrypted.toString('utf8');
}
