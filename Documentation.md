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

 Method Overrides for PUT and DELETE requests: Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
 * Implementation: 
 var express = require('express')
var methodOverride = require('method-override')
var app = express()
 
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
Example call with query override using HTML <form>:

<form method="POST" action="/resource?_method=DELETE">
  <button type="submit">Delete resource</button>
</form>

<h4>Connect-flash</h4>
* The flash is a special area of the session used for storing messages. Messages are written to the flash and cleared after being displayed to the user. The flash is typically used in combination with redirects, ensuring that the message is available to the next page that is to be rendered.

<h4>Multer</h4>
* Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. 

<h4>Passport</h4>
* Passport is middleware for Node.js that makes it easy to implement authentication and authorization. Whether you are building your first login page or are an expert in all things identity, the documentation will help you understand Passport and use it in your applications.

<h4>Puppeteer</h4>
* Puppeteer is a Node.js library which provides a high-level API to control Chrome or Firefox over the DevTools Protocol or WebDriver BiDi. Puppeteer runs in the headless (no visible UI) by default but can be configured to run in a visible ("headful") browser.
<h3>Features</h3>
Most things that you can do manually in the browser can be done using Puppeteer! Here are a few examples to get you started:

Automate form submission, UI testing, keyboard input, etc.
Create an automated testing environment using the latest JavaScript and browser features.
Capture a timeline trace of your site to help diagnose performance issues.
Test Chrome Extensions.
Generate screenshots and PDFs of pages.
Crawl a SPA (Single-Page Application) and generate pre-rendered content (i.e. "SSR" (Server-Side Rendering)).

<h4>Cheerio</h4>
Features
❤ Familiar syntax: Cheerio implements a subset of core jQuery. Cheerio removes all the DOM inconsistencies and browser cruft from the jQuery library, revealing its truly gorgeous API.

ϟ Blazingly fast: Cheerio works with a very simple, consistent DOM model. As a result parsing, manipulating, and rendering are incredibly efficient.

❁ Incredibly flexible: Cheerio wraps around parse5 parser and can optionally use @FB55's forgiving htmlparser2. Cheerio can parse nearly any HTML or XML document.