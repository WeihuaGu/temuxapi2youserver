const crypto = require('crypto');
const key = require('./key');
var aes_encrypt = (text, key, iv) =>{
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}
exports.getencryptedpass = ()=>{
	const passencrypted = crypto.publicEncrypt(key.pubKey, Buffer.from(key.aeskey+key.aesiv));
	return passencrypted;
}
exports.encrypt = (data) => {
 const aesencrypted = aes_encrypt(data,key.aeskey,key.aesiv);
 return aesencrypted;
};
