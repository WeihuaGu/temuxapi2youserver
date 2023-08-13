# temuxapi2youserver
termux api get you phone info,and send them to you own server
### install
#### install termux app in your phone.
#### install pkg termux-api
` pkg install termux-api`
#### install termux-api app
#### install nodejs dependencies
`npm install`

### configure
#### password
- in key.js,input you pubkey
- in send.js configure apiurl or export sendtermuxapiurl

### start 
node loop.js
### decrypt from your server
To decrypt the message sent by the server while ensuring its security, please follow the steps outlined below:
#### Obtain the encrypted message and the encrypted key.
- from http post header,get decryptpass.
- Perform asymmetric decryption using a private key to retrieve the symmetric encryption key and the initialization vector (IV) combined.
#### Decrypt the original message using the symmetric encryption key and the IV.
- Perform asymmetric decryption using your private key:
Decode the received Base64-encoded encrypted key to obtain the ciphertext.
Decrypt the ciphertext using your private key to obtain the combined form of the key and IV (i.e., pass+iv).
- Split the key and the IV:
From the decrypted pass+iv combination, the first 32 bytes represent the key, and the last 16 bytes represent the IV.
Decrypt the message using the symmetric encryption key and the IV:
- Use the split key and IV as parameters to create a decryptor using the same encryption algorithm (aes-256-cbc).
Decode the received Hex-encoded encrypted content to obtain the ciphertext.
Decrypt the ciphertext using the decryptor to obtain the original message.

#### Important considerations:
- Ensure that your private key and public key are a matched pair, with the private key used for decryption and the public key used for encryption.
- Ensure that you use the same encryption algorithm (aes-256-cbc) for the decryption operation.
- When splitting the key and IV, the first 32 bytes represent the key, and the last 16 bytes represent the IV.

