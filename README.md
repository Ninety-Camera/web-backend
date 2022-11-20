# Ninety Camera - Smart Monitoring Platform for Security Cameras

![GitHub language count](https://img.shields.io/github/languages/count/Ninety-Camera/web-backend)
![GitHub top language](https://img.shields.io/github/languages/top/Ninety-Camera/web-backend)
![GitHub repo size](https://img.shields.io/github/repo-size/Ninety-Camera/web-backend)

Ninety Camera is a smart monitoring platform for security cameras which can detect human intrusions from camera footage and notify users about the intruder. The whole system is come up with a desktop application, mobile applicatin and a web application. This is the web server of the system which contain the backend of the web application and backend of the mobile application.
This server is responsible for
 - User Authentication
 - User Authrorization
 - User registration and login
 - Communicate between desktop and the mobile app
 - Send intrusion notifications
 - Communicate system data with the mobile app

For the database of the application PostgreSQL is used. As well as for prisma ORM is used for managing the databsase. Currently azure postgreSQL database is used as the database server.

And following are the environmental variables that used for the project.
 - DATABASE_URL="Url for the remote database"
 - TOKEN_SECRET="secret code for create jwt tokens"
 - TOKEN_EXPIRE_TIME="time for a jwt token to expire"
 - APP_PASSWORD="Google account password for sending the forgot password tokens"

You need to place above environmental variables on a .env files to run the application. As well as to run in the development environment you need to set PORT environmental variable also.

And firebase config file is required to send the notifications to the mobile apps. Change the firebase-conf.json at src/services/. You can take this configuration file from firebase by creating a project.

## Provided endpoints and functionalities
 - User CRUD operations
 - System CRUD operations
 - Camera CRUD operations
 - Notification services
 - Email sending services

## Technologies used
 - Express.js
 - Prisma
 - PostgreSQL
 - SocketIO
 - Firebase
 
## Requirements
 - NodeJS installed in the PC
 - Locally or remote postgreSQL server
 - Firebase project
 
## Setup
 - Clone the Repository
 - Execute `npm i` to install the dependencies
 - Run `npx prisma migrate dev` to deploy the db schema
 - Run `node index.js` to start the server

## Development
 - Fork the repository to your account
 - Clone the repository to your pc
 - Execute `npm i` to install the dependencies
 - Run `npx prisma migrate dev` to deploy the db schema.  
 - Execute `node index.js` to start the server (Or otherwise you can user nodemon for this process)
 
 ## Testing
  - Testing is done using Jest
  - Testing is done inside docker containers
  - To run tests you need to install docker to your system
  - Execute `npm run docker:up` command to initialize the docker container
  - Execute `npm test` command to run the tests
  - Execute `npm run docker:down` command to stop the docker container
  - All the tests are located inside the __tests__ directory

