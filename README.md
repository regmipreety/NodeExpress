 EJS Templates
* EJS templates are processed through the EJS view engine on the server
* It is used to render data in view

Middleware
* Code which runs (on the server) between getting a request and sending a response
Examples:
* Logger middleware to log details of every request
* Authentication check middleware for protected routes
* Middleware to parse JSON data from requests
* Return 404 pages
Morgan
* HTTP request logger middleware for node.js
* morgan(format, options)
Create a new morgan logger middleware function using the given format and options. 
