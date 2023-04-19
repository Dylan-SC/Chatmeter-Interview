import './App.css';
import React, { Component } from 'react';

// used to process and handle incoming requests
import ax from 'axios';
// Importing these elements from bootstrap for the application layout
import { Button, Container} from 'react-bootstrap';

// establish AXIOS so that the upcoming calls reach the backend server
const axios = ax.create({
  baseURL: "http://0.0.0.0:3001",
  headers: {'Content-Type': 'application/json'}})

class App extends Component {
  constructor(props) {
      super(props);
        this.state = {
          currentUrl: '',
          currentFavicon: '',
          currentTitle: '',
          fetchData: []
      }
  }

  // The submit button will send a URL to the backend to:
  //      - check the URL's validity
  //      - Fetch associated website info
  //      - Store information in database
  onClickSubmitUrl= async () => {
    const validatedURL = validateURL(this.state.currentUrl)
    if((this.state.currentUrl ==='')||(validatedURL === false)){alert('Please input a valid website URL into the input field.');}

    else{
      const webInfo = {url: this.state.currentUrl}
      await axios.post('/insert', webInfo)
          .then((response) => {
            if(response.data.status ==='PASSED'){
              alert('successfully posted')
              //TODO: DISPLAY FAVICON + TITLE FOR SUCCESSFUL SUBMISSIONS
            }
            else{
              if(response.data.status === "FAILED"){alert('There was an error submitting the request. Please check the console logs and try again.');}
              console.log(response)
              //TODO: MAYBE DISPLAY A FAILED FAVICON + FAILED TITLE FOR UNSUCCESSFUL SUBMISSIONS?
            }
            console.log(this.state.currentUrl)
            
            //This will fetch and display history if it exists after clicking the submit button
            this.onClickFetchHistory();
          })
    }
  }

  // The check history button will fetch preexisting search history from DB, if any
  // Will be able to load history from previous sessions
  onClickFetchHistory = async() => {
    await axios.get("/get-history")
        .then((response) => {
          if(response.data.status ==='PASSED'){this.setState({fetchData: response.data.result})}
          else{
            if(response.data.status === "FAILED"){alert('There was an error when fetching the history. Please check the console logs and try again.');}
            console.log(response)
          }
          console.log(this.state.fetchData)
        })
  }

  // The delete button clears the search history from the DB
  onClickDeleteHistory = async() => {
    if (window.confirm("Are you sure you want to clear ALL existing search history?")) {
      await axios.delete(`/delete`)
      .then((response) => {
        if(response.data.status ==='PASSED'){this.setState({fetchData: []})}
        else{
          if(response.data.status === "FAILED"){alert('There was an error when Deleting the history. Please check the console logs and try again.');}
          console.log(response)
        }
      })
    }
  }

  // Keep track of what's in the input box 
  onChange = (event) => {
    const inputValue = event.target.value;
    this.setState({ currentUrl: inputValue })
  }

  render() {
    return (
        <div className='App'>


            <h1>Title Bot</h1>
            <h6>Store a website's title and logo information</h6>


              <div className='form'>
                {/* TODO: GET CURRENT INFO FUNCTION WORKING ONCE FAVICON + TITLE CAN BE FETCHED */}
                {/* <DisplayCurrentInfo currentInfo={this.state} /> */}
                <input onChange={this.onChange} id='setWebsiteURL' placeholder='Enter Website URL' value={this.state.currentUrl}required />
              </div>


              <div className="d-grid gap-2 col-3 mx-auto">
                <Button onClick={() => { this.onClickSubmitUrl() }}>Submit</Button> 
              </div>


              <Container className="container">
                <WebInfoList fetchData={this.state.fetchData} />
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

function WebInfoList(props){
  if(props.fetchData === []){
    return
  }
  else{
    return(
      <ul className="list-group">
        {
          props.fetchData.map((entry, idx) => {
            return(
                <ul className="list-group list-group-horizontal">
                  <li className="list-group-item" key={`${entry.id}-${idx}-imageLink`}>{entry.imageLink}</li>
                  <li className="list-group-item" key={`${entry.id}-${idx}-websiteTitle`}>{entry.websiteTitle}</li>
                  <li className="list-group-item" key={`${entry.id}-${idx}-websiteURL`}>{entry.websiteURL}</li>
                </ul>
            )
          })
        }
      </ul>
    )
  }
}

function DisplayCurrentInfo(props){
  if(props.currentInfo.currentUrl==='' || props.currentTitle==='' || props.currentFavicon===''){
    return
  }
  else{
    return(
      <ul className="list-group list-group-horizontal">
        <li className="list-group-item" key={`${props.currentInfo.currentUrl}--imageLink`}>{props.currentInfo.currentFavicon}</li>
        <li className="list-group-item" key={`${props.currentInfo.currentUrl}--websiteTitle`}>{props.currentInfo.currentTitle}</li>
        <li className="list-group-item" key={`${props.currentInfo.currentUrl}--websiteURL`}>{props.currentInfo.Url}</li>
      </ul>
    )
  }
}

function validateURL(url){
  try{
    const validatedURL = new URL(url)
    return true;
  }
  catch{
    return false;
  }
}

export default App;
