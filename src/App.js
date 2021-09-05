import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import "./App.css";
import axios from 'axios'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      locationName : '',
      locationData :{},
      locationImg : '',
      errormessege:false,
    }
  }
  handleLocationName =  (e) => { this.setState({locationName : e.target.value})}
  handleSubmit = async (e) => {
    e.preventDefault();
    const url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.locationName}&format=json`;
    console.log(this.state.locationName,url)
    try{
    const response = await axios.get(url)

    console.log(response.data[0])
        this.setState({
      locationData:response.data[0],
    });}
    catch{
      this.setState({
  
        errormessege:true
      })
    }
    const map_url = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${this.state.locationData.lat},${this.state.locationData.lon}&format=jpg `
    const mapres = await axios.get(map_url)
    const map = mapres.config.url
    this.setState({
      map:map
    })
     
 
  }

  render(){
  return (
    <div id='all'>
      <Form onSubmit={this.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>City Name</Form.Label>
          <Form.Control type="text" onChange={this.handleLocationName} placeholder="Enter City Name" />
        </Form.Group>
        <Button variant="primary" type="submit">
          EXPLORE
        </Button>
      </Form>
    
      <div>
        <h2>City Info</h2>
        <p>name :{this.state.locationData.display_name}</p>
        <p>latitude :{this.state.locationData.lat}</p>
        <p>longitude :{this.state.locationData.lon}</p>
        
      </div>
      
        <br/>
      <img src= {this.state.map} alt=" " width="500" height="600"/>
  
      {
  this.state.errormessege&&<p >invalid input</p>
}
    </div>
  );
}
}

export default App;
