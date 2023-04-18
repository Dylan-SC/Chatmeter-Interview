# Chatmeter-Interview: TITLEBOT
> This is a take home assignment to guage my skills as a developer

## TODO LIST
- [x] Use React Native
- [x] The backend should be RESTful
- [ ] Satisfy visual requirements; Decent looking webpage
- [ ] Make the code readable; keep it organized
- [ ] Scala/Java for backend
- [x] Dockerize the application
- [x] Persitent storage, either client or server side
- [ ] basic unit testing

## How to Setup and Run the Project
- download the repository
- navigate to the repository's directory in terminal
- run the following command:
```
docker-compose up --build
```
- open up a webbrowser and go to the following link: localhost:3000
- you can use then use the webpage normally

## How to Check the Postgres Database
- once the docker-compose command has been run, do the following:
- go to localhost:8000 in your webbrowser
- sign in with the following credentials:
System: MySQL
Server: mysql_db
Username: root
Password: MYSQL_ROOT_PASSWORD
Database: [LEAVE BLANK]
- select Permanent login
