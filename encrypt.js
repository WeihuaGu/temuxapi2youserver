const crypto = require('crypto');
const key = require('./key');
var aes_encrypt = (data, aeskey, iv) =>{
    iv = iv || null;
    var clearEncoding = 'utf8';
    var cipherEncoding = 'base64';
    var cipherChunks = [];
    var cipher = crypto.createCipheriv('aes-256-ecb', aeskey, iv);
    cipher.setAutoPadding(true);
    cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
    cipherChunks.push(cipher.final(cipherEncoding));
    return cipherChunks.join('');
}
exports.encrypt = (data) => {
 console.log(key.aeskey);
 const aesencrypted = aes_encrypt(Buffer.from(data),key.aeskey,null);
 //const aeskeyencrypted= crypto.publicEncrypt(key.pubKey, Buffer.from(key.aeskey));
 //console.log(aeskeyencrypted);
 //console.log(aesencrypted);
 return aesencrypted;
};
