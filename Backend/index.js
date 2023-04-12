const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

    const db = mysql.createPool({
        host: 'mysql_db', // the host name MYSQL_DATABASE: node_mysql
        user: 'MYSQL_USER', // database user MYSQL_USER: MYSQL_USER
        password: 'MYSQL_PASSWORD', // database user password MYSQL_PASSWORD: MYSQL_PASSWORD
        database: 'books' // database name MYSQL_HOST_IP: mysql_db
    })

    const app = express();
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));

    // Enables CORS security headers
    app.use(cors())

    // This is the "home page router"
    app.get('/', (req, res) => {
        res.send('Hi There')
    });

    // get all of the saved search history
    app.get('/get', (req, res) => {
        const SelectQuery = " SELECT * FROM search_history";
        db.query(SelectQuery, (err, result) => {
            res.send(result)
        })
    })

    // Add a recent successful search to the database
    app.post("/insert", (req, res) => {
        const websiteURL = req.body.setWebsiteURL;
        const imageLink = req.body.setImageLink;
        const websiteTitle = req.body.setWebsiteTitle;
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
  