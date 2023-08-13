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
var aes_decrypt = (encrypted, key, iv) => {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

var getDecryptedMessage = (encryptedPass, encryptedContent) => {
  const decryptedPass = crypto.privateDecrypt(key.privKey, Buffer.from(encryptedPass, 'base64'));
  const passAndIv = decryptedPass.toString('utf8');
  const key = passAndIv.substring(0, 32);
  const iv = passAndIv.substring(32);
  const decryptedContent = aes_decrypt(encryptedContent, key, iv);
  return decryptedContent;
};

exports.decrypt = (encryptedData) => {
  const { encryptedpass, encryptedcontent } = encryptedData;
  const decryptedMessage = getDecryptedMessage(encryptedpass, encryptedcontent);
  return decryptedMessage;
};
