//import Axios from 'axios';
//import fetch from 'node-fetch';

// const axios = Axios.create()
async function fetchFavicon(url){
  faviconUrl = 'https://s2.googleusercontent.com/s2/favicons?domain_url='+url;
  try{
    await app.get(faviconUrl)
    .then((resp) => {
      response = {status: 'PASSED', response: resp.toString()};
      return response;
    })
  }
  catch(err){
    console.log(err);
    response = {status: 'FAILED', response: err};
    return response;
  }
}

// fetchWebInfo = async(url) => {
//   await fetch(url)
//   .then((response) => {
//     response = {status: 'PASSED', response: response};
//     return response;
//   })
//   .catch((error) => {
//     response = {status: 'FAILED', response: error};
//     return response;
//   })
// }




const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

    const db = mysql.createPool({
        host: 'mysql_db', // the host name MYSQL_DATABASE: node_mysql
        port: "3306",
        user: 'MYSQL_USER', // database user MYSQL_USER: MYSQL_USER
        password: 'MYSQL_PASSWORD', // database user password MYSQL_PASSWORD: MYSQL_PASSWORD
        database: 'history' // database name MYSQL_HOST_IP: mysql_db
    })

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors()); // Enables CORS security headers

    // This is the "home page router" ; used to verify server is up
    app.get('/', (req, res) => {res.send('Hi There! I am alive! :)');});

    // get all of the saved search history from the database
    app.get('/get-history', (req, res) => {
        const SelectQuery = " SELECT * FROM search_history";
        db.query(SelectQuery, (err, result) => {
          if(err){
            console.log(err)
            res.send({status: 'FAILED', error: err})
          }
          else{
            res.send({status: "PASSED", result: result})
            console.log(result)
          }
        })
    })

    // Take a submitted URL and do the following:
    // validate that it is a working URL
    // fetch website data
    // store all the information in the database
    // MAYBE: send response to front end, have it update search history list
    app.post("/insert", (req, res) => {

        console.log(req.body)

        const websiteURL = req.body.url;

        // Running into CORS issue when fetching favicon?
        const fetchFaviconLink = fetchFavicon(websiteURL)
        if(fetchFaviconLink.status === "PASSED"){imageLink = fetchFaviconLink.response;}
        else{var imageLink = "imageLink";}

        var websiteTitle = "websiteTitle";


        const InsertQuery = "INSERT INTO search_history (websiteURL, imageLink, websiteTitle) VALUES (?, ?, ?)";

          db.query(InsertQuery, [websiteURL, imageLink, websiteTitle], (err, result) => {
            if(err){
              console.log(err)
              res.send({status: 'FAILED', error: err})
            }
            else{
              res.send({status: "PASSED", result: result})
              console.log(result)
            }
          })
    })


    // Clear the search history table in the database
    app.delete("/delete", (req, res) => {
        const DeleteQuery = "DELETE FROM search_history";
        db.query(DeleteQuery, (err, result) => {
          if (err){
            console.log(err);
            res.send({status: 'FAILED', error: err})
          }
          else{
            res.send({status: "PASSED", result: result})
            console.log(result)
          }
        })
      })

    // This is the port the API will be exposed on when the server is running
    app.listen('3001', "0.0.0.0")
  