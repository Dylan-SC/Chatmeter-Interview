import './App.css';
import React, { Component } from 'react';

// used to process and handle incoming requests
import axios from 'axios';

// Importing these elements from bootstrap for the application layout
import { Button, Container, Card, Row } from 'react-bootstrap';

// Import Sass customization file
import './custom.scss';

class App extends Component {
  constructor(props) {
      super(props);
        this.state = {
          setWebsiteURL: '',
          setImageLink: '',
          setWebsiteTitle: '',
          fetchData: [],
          reviewUpdate: ''
      }
  }

  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value
    this.setState({
      [nam]: val
    })
  }
  
  handleChange2 = (event) => {
    this.setState({
      reviewUpdate: event.target.value
    })
  }
  
  //TODO: Switch this to be handled on the Server side?
  // The submit button will use javascript to fetch website details and send it to the DB
  // Flow:
  //  Input the URL -> verify URL is good
  //  Fetch website details using URL
  //  Store details in DB using POST endpoint
  //  Update the history box by calling the get-history endpoint
  submit = () => {
    axios.post('/api/insert', this.state)
        .then(() => { alert('successfully posted') })
    console.log(this.state)
    document.location.reload();
  }

  componentDidMount() {
    this.update()
  }

  // The check history button will fetch preexisting search history from DB if it exists
  update = () => {
    axios.get("/api/get-history")
        .then((response) => {
            this.setState({
                fetchData: response.data
            })
        })
  }

  // The delete button clears the search history from the DB
  delete = () => {
    if (window.confirm("Do you want to clear the search history? ")) {
        axios.delete(`/api/delete`)
        document.location.reload()
    }
  }
  
  render() {
    let card = this.state.fetchData.map((val, key) => {
        return (
            <React.Fragment>
                <Card style={{ width: '18rem' }} className='m-2'>
                  <Card.Img orientation="top" src={val.ImageLink}/>
                    <Card.Body>
                        <Card.Title>{val.websiteTitle}</Card.Title>
                        <Card.Text>
                            {val.websiteURL}
                        </Card.Text>
                        <input name='reviewUpdate' onChange={this.handleChange2} placeholder='Update Review' ></input>
                    </Card.Body>
                </Card>
            </React.Fragment>
        )
    })
  
    return (
        <div className='App'>
            <h1>Title Bot</h1>
            <h6>Store a website's title and logo information</h6>

              <div className='form'>
                  <input name='setWebsiteURL' placeholder='Enter Website URL' onChange={this.handleChange} />
                    
                  <div className="d-grid gap-2 col-3 mx-auto">
                    <Button className='my-2' variant="primary" onClick={this.submit}>Submit</Button> 
                  </div>    
              </div>

              <Container>
                  <Row>
                      {card}
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
