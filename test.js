var { encrypt } = require('./encrypt');

const text = '你好';
const crypted = encrypt(text); // 加密
console.log(crypted);
