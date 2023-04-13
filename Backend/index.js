const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

    const db = mysql.createPool({
        host: 'mysql_db', // the host name MYSQL_DATABASE: node_mysql
        user: 'MYSQL_USER', // database user MYSQL_USER: MYSQL_USER
        password: 'MYSQL_PASSWORD', // database user password MYSQL_PASSWORD: MYSQL_PASSWORD
        database: 'history' // database name MYSQL_HOST_IP: mysql_db
    })

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Enables CORS security headers
    app.use(cors());

    // This is the "home page router"
    app.get('/', (req, res) => {
        res.send('Hi There');
        console.log(req);
    });

    // get all of the saved search history
    app.get('/get-history', (req, res) => {
        const SelectQuery = " SELECT * FROM search_history";
        db.query(SelectQuery, (err, result) => {
            res.send(result)
        })
    })

    // Take a submitted URL and do the following:
    // validate that it is a working URL
    // fetch website data
    // store all the information in the database
    // MAYBE: send response to front end, have it update search history list
    app.post("/insert", (req, res) => {
        console.log(req)
        const websiteURL = req.body.url;
        // const imageLink = req.body.imageLink;
        // const websiteTitle = req.body.title;
        const imageLink = "test";
        const websiteTitle = "test";
        const InsertQuery = "INSERT INTO search_history (website_url, image_link, website_title) VALUES (?, ?, ?)";
        db.query(InsertQuery, [websiteURL, imageLink, websiteTitle], (err, result) => {
          console.log(result)
        })
      })

    // Clear the search history table
    app.delete("/delete", (req, res) => {
        const DeleteQuery = "DELETE * FROM search_history";
        db.query(DeleteQuery, (err, result) => {
          if (err) console.log(err);
        })
      })

    // This is the port the API will be exposed on when the server is running
    app.listen('3001', () => { })
  