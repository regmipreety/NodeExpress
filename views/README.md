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

Mongoose
* Mongoose is an ODM library- Object Document Mapping library
* Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
* Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box. 

Schemas and Models
* Schemas defines the structure of a type of data/document eg properties & property types example: User schema has following properties
name(string), required
age(number)
bio(string), required
* Models allow us to communicate with database collections

* Asynchronous JavaScript is the programming method where operations are run independently allowing the program to continue running while waiting for certain tasks to complete. Synchronous JavaScript is the programming approach where tasks of a program are executed sequentially one at a time
