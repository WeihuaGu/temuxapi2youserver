# Termux API 获取手机信息并发送到你自己的服务器

## 安装
1. 在你的手机上安装Termux应用。
2. 在Termux中安装termux-api包：`pkg install termux-api`。
3. 安装Termux API app应用。并给这个应用赋予相应的权限。
4. 安装Node.js依赖项：`npm install`。

## 配置
进入项目目录
`cd termuxapi2youserver`
### 密码
在key.js中输入你的公钥（pubkey）。如果你没有使用`node genkeypair`生成，然后把生成的公钥粘贴在key.js中，同时妥善保管私钥。

### POST URL
在send.js中配置apiurl，或者export sendtermuxapiurl变量。

## 启动
运行命令：`node loop.js`。

## 从你的服务器解密
为了解密服务器发送的消息并确保其安全性，请按照以下步骤进行操作：

1. 获取加密的消息和加密的密钥。
2. 从POST JSON中获取decryptpass，并使用私钥进行非对称解密，以获取对称加密密钥和初始化向量（IV）的组合。
3. 使用对称加密密钥和IV对原始消息进行解密。
4. 使用你的私钥进行非对称解密：将收到的Base64编码的加密密钥解码，以获取密钥和IV的组合形式（即pass+iv）。将密文使用私钥解密，以获取密钥和IV的组合。
5. 分离密钥和IV：decryptpass解密后,是pass+iv组合中，前32个字节表示密钥，后16个字节表示IV。使用密钥和IV解密消息：
   - 使用分离后的密钥和IV作为参数，使用相同的加密算法（aes-256-cbc）创建解密器。
   - 将收到的Hex编码的加密内容解码，以获取密文。
   - 使用解密器对密文进行解密，以获取原始消息。
   - encrypt.js中有解密的示范函数。

