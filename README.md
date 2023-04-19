# Chatmeter-Interview: TITLEBOT
> This is a take home assignment to guage my skills as a developer

## Initial Project Requirements
- [x] Use React Native
- [x] The backend should be RESTful
- [x] Satisfy visual requirements; Decent looking webpage
- [ ] Make the code readable; keep it organized
- [ ] Scala/Java for backend
- [x] Dockerize the application
- [x] Persitent storage, either client or server side
- [ ] basic unit testing

## Initial Functionality Requirements
- [x] Submit URL for processing
- [ ] display Favicon and Title for correct URLs on Frontend
- [x] Store search history into database
- [ ] Ability to fetch persisted storage
- [ ] Display previous search history from storage

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
```
System: MySQL
Server: mysql_db
Username: root
Password: MYSQL_ROOT_PASSWORD
Database: [LEAVE BLANK]
```
- select Permanent login

## TODO LIST
- [x] Remove NGINX from the repo - [deprecated]
- [ ] Reorganize front end code to meet current industry standards
- [ ] TitleBot functionality - get favicon + title
- [ ] TitleBot functionality - store favicon + title into postgres
- [ ] TitleBot functionality - Populate frontend with searched result
- [ ] TitleBot functionality - Populate frontend with search history
- [x] Test that the delete history functionality works well
- [x] Test that the check history functionality works well
- [ ] Add error handling where necessary
