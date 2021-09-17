import axios from 'axios';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      data: '',
      show: false
    }
  }
  locationEvent = (event) => {
    event.preventDefault();
    this.setState({
      location: event.target.value
    })
  }

  locationData = async (e) => {
    e.preventDefault();
    try {
      this.setState({ show: true })
      const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.location}&format=json`;
      const request = await axios.get(url);
      this.setState({ data: request.data[0] })
    }
    catch (err) {
      this.setState({
        show: false
      });
    }
  }


  render() {
    if (this.state.show === true) {
      return (
        <div>
          <h2>City Explorer</h2>
          <Form>
            <Form.Label>Where would you like to explore?</Form.Label>
            <br></br>
            <br></br>
            <Form.Control type="text" placeholder="input location here…" onChange={this.locationEvent} />
            <br></br>
            <br></br>

            <Button type="submit" onClick={this.locationData}>Explore!</Button>
          </Form>
          <p>Welcome to {this.state.data.display_name} is located at <br/>latitude ={this.state.data.lat} <br/>by longitude = {this.state.data.lon}</p>
          <Image src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${this.state.data.lat},${this.state.data.lon}`} alt='' fluid />

        </div>
      )
    } else {
      return(
      <div>
              <h2>City Explorer</h2>
      <Form>
        <Form.Label>Where would you like to explore?</Form.Label>
        <br></br>
        <Form.Control type="text" placeholder="input location here…" onChange={this.locationEvent} />
        <br></br>
        <Button type="submit" onClick={this.locationData}>Explore!</Button>
      </Form>

      </div>
            )
          }
        }
      }
      export default App; 