var { encrypt, getencryptedpass } = require('./encrypt');

const text = '你好';
console.log(getencryptedpass());
const crypted = encrypt(text); // 加密
console.log(crypted);
