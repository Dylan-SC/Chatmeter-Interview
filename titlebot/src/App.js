import './App.css';
import React, { Component } from 'react';

// used to process and handle incoming requests
import ax from 'axios';
// Importing these elements from bootstrap for the application layout
import { Button, Container, Row } from 'react-bootstrap';

// establish AXIOS so that the upcoming calls reach the backend server
const axios = ax.create({
  baseURL: "http://0.0.0.0:3001",
  headers: {'Content-Type': 'application/json'}})

class App extends Component {
  constructor(props) {
      super(props);
        this.state = {
          fetchData: []
      }
  }

  // The submit button will send a URL to the backend to:
  //      - check the URL's validity
  //      - Fetch associated website info
  //      - Store information in database
  onClickSubmitUrl= async () => {
    //TODO: REPLACE DOCUMENT.getElementById - It is bad practice to get values like this
    var url = document.getElementById("setWebsiteURL").value;
    if(url ===''){alert('Please input a website URL into the input field.');}
    else{
      const webInfo = {url: url.toString()}
      await axios.post('/insert', webInfo)
          .then(() => { alert('successfully posted') })

      //TODO: REPLACE THE RELOAD FUNCTION BELOW WITH SOMETHING BETTER
      document.location.reload();
    }
}

  // The check history button will fetch preexisting search history from DB, if any
  // Will be able to load history from previous sessions
  onClickFetchHistory = async() => {
    await axios.get("/get-history")
        .then((response) => {
            this.setState({
                fetchData: response.data
            })
        })
    //TODO: Add function to reload webpage with new information fetched

  }

  // The delete button clears the search history from the DB
  onClickDeleteHistory = async() => {
    if (window.confirm("Are you sure you want to clear ALL existing search history?")) {
        await axios.delete(`/delete`)

        //TODO: Upon successful delete, clear this.state.fetchData[]
        //TODO: REPLACE THE RELOAD FUNCTION BELOW WITH SOMETHING BETTER
        document.location.reload()
    }
  }
  
  render() {
    return (
        <div className='App'>
            <h1>Title Bot</h1>
            <h6>Store a website's title and logo information</h6>

              <div className='form'>
                  <input id='setWebsiteURL' placeholder='Enter Website URL' required />
                    
                  <div className="d-grid gap-2 col-3 mx-auto">
                    <Button className='my-2' variant="primary" onClick={this.onClickSubmitUrl}>Submit</Button> 
                  </div>    
              </div>

              <Container>
                  <Row>
                      {/* This is where the history will be displayed once the database is properly storing the URL */}
                  </Row>
              </Container>

              <div className ='history-buttons'>
                <Button onClick={() => { this.onClickDeleteHistory() }}>Clear History</Button>
                <Button onClick={() => { this.onClickFetchHistory() }}>Check History</Button>
              </div>

            <a
              className="App-link"
              href="https://github.com/chatmeter/titlebot"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Assignment Requirements
            </a>
        </div>
    );
  }
}

export default App;
