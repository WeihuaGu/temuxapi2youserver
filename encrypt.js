const crypto = require('crypto');
const key = require('./key');
exports.encrypt = (data) => {
 console.log(key);
 return crypto.publicEncrypt(key.pubKey, Buffer.from(data));
};
