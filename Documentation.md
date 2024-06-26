Promise
* The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value
Await
* The await operator is used to wait for a Promise. It can only be used inside an async function within regular JavaScript code; however it can be used on it own with JS modules

Async/Await: It allows you to write asynchronous code in a synchronous manner. Async doesn't have resolve or reject parameters. Everything after Await is placed in an event queue
* Async makes  function return a promise
* Await makes an async function wait for a promise

What is JSON Web Token?
JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

 JWT contains:
 * Headers- Tells the server what type of signature is being used (meta)
 * Payload- Used to identify the user (eg contains user id)
 * Signature- Makes the token secure 
