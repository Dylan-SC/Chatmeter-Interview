import './App.css';
import React, { Component } from 'react';

// used to process and handle incoming requests
import ax from 'axios';

// Importing these elements from bootstrap for the application layout
import { Button, Container, Row } from 'react-bootstrap';

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

  //TODO: Switch this to be handled on the Server side?
  // The submit button will send a URL to the backend to check validity & find website info
  submit= async () => {
    console.log("hello")
    var url = document.getElementById("setWebsiteURL").value;
    if(url ===''){
      console.log("hellooo")
      alert('Please input a website URL into the input field.');
    }
    else{
      console.log("helloooooooo")
      //const webInfo = new WebInfo(url);
      const webInfo = {url: url.toString()}
      console.log(webInfo)
      await axios.post('/insert', webInfo)
          .then(() => { alert('successfully posted') })
      console.log(this.state)
      document.location.reload();
    }
}

  // The check history button will fetch preexisting search history from DB if it exists
  // Will be able to load history from previous sessions
  update = () => {
    axios.get("/get-history")
        .then((response) => {
            this.setState({
                fetchData: response.data
            })
        })
  }

  // The delete button clears the search history from the DB
  delete = () => {
    if (window.confirm("Do you want to clear the search history? ")) {
        axios.delete(`/delete`)
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
                    <Button className='my-2' variant="primary" onClick={this.submit}>Submit</Button> 
                  </div>    
              </div>

              <Container>
                  <Row>
                      {/* This is where the history will be displayed once the database is properly storing the URL */}
                  </Row>
              </Container>

              <div className ='history-buttons'>
                <Button onClick={() => { this.delete() }}>Clear History</Button>
                <Button onClick={() => { this.update() }}>Check History</Button>
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
