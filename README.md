# Employee Directory

## BACKEND

 directory api containing the following routes:

- GET /api/v1/employees  to retrieve all employees
- GET /api/v1/employees/:id to retrieve an employee by id
- POST /api/v1/employees to add employee
- PUT /api/v1/employees/:id to update employee
- DELETE /api/v1/employees/:id to delete employee

This application was written using nodejs/express/sequelize/MySQL Database/mocha-chai

## Instructions to run locally

Make sure you have [Node.js](http://nodejs.org/), [MySQL](https://dev.mysql.com/downloads/) installed.

RUN SCRIPTS in CREATE_DATABASE_TABLE.txt file to create Database/Tables

```sh
$ git clone
$ npm install 
$ npm run dev
```

Your app should now be running on [localhost:8000](http://localhost:8000/).

## Documentation

Full API Documentation can be found
http://localhost:8000/api-docs


Back End Application Structure:

|-- app
    |-- .gitignore
    |-- README.md
    |-- .babelrc
    |-- .env
    |-- .eslint.js
    |-- package-lock.json
    |-- package.json
    |-- api
        |-- resources
        |-- server
            |-- controllers
                |-- DepartmentController.js
                |-- EmployeeController.js
                |-- FileUploadController.js
                |-- JobTitleController.js
                |-- SalaryController.js
            |-- middleware
                |-- upload.js
            |-- routes
                |-- DepartmentRoutes.js
                |-- EmployeeRoutes.js
                |-- FilesRoutes.js
            |-- services
                |-- DepartmentService.js
                |-- EmployeeService.js
                |-- JobTitleService.js
                |-- SalaryService.js
            |-- src
                |-- config
                    |-- config.js
                |-- migrations
                |-- models
                    |-- index.js
                    |-- employee.js
                    |-- department.js
                    |-- jobtitle.js
                    |-- salary.js
                |-- seeders
            |-- utils
                |-- Utils.js
        |-- test
            |-- employeeTest.js
        |-- swagger
            |-- swagger.json


## FRONTEND

FrontEnd web application to Edit/Update/Delete/View Employees

This application was written using VueJS

## Instructions to run locally

Make sure you have [Node.js](http://nodejs.org/), [VueJS](https://vuejs.org/v2/guide/installation.html) installed.

```sh
$ git clone h
$ cd .../frontend #... is your local directory
$ npm install #to install all dependencies and create node_modules folder
$ npm run serve
```

Your app should now be running on [localhost:8081](http://localhost:8081/).



APP IMPROVEMENTS:
The application is a basic CRUD application and the following should be added to it:
- Authentication:
  -Add Login feature
  -Either use JWT tokens to authenticate all API routes or Oauth 2.0 authentication
  -Add Role-Based authentication in Database so that only the 'ADMIN' can modify data
- Code Design:
  -Refactor the code as much as possible, separate concerns such as server side validations
  -Separate Saving files on another server in order to take up unnecessary disk storage on the server hosting the application (Design as a seperate microservice)
  -Write testing scenarios for all routes/possibilities
  -Automate the unit test in order to implement a CI/CD process where deployment files are pushed after passing all required tests.


