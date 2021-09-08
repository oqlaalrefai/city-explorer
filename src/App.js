import React from "react";
import { Button, Form, Image, Modal } from "react-bootstrap";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lon: "",
      placeName: "",
      displayErr: false,
      displayMap: false,
      zoom: 12,
      stop: true,
    };
  }
  handler = async (event) => {
    event.preventDefault();
    let place = event.target.place.value;
    let URL = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${place}&format=json`;
    console.log(this.state);
    try {
      let recData = await axios.get(URL);
      this.setState({
        lat: recData.data[0].lat,
        lon: recData.data[0].lon,
        placeName: recData.data[0].display_name,
        displayMap: true,
      });
    } catch {
      this.setState({
        displayErr: true,
      });
    }
  };
  render() {
    return (
      <body>
        <header>
          <h1>City Explorer </h1>
        </header>

        <main>
          <Form onSubmit={this.handler}>
            <Form.Group controlId="formGridEmail">
              <Form.Label>Enter the place:</Form.Label>
              <Form.Control type="text" placeholder="enter location name" name="place"/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <p> City name: {this.state.placeName}</p>
          {this.state.displayMap && (
            <p>
              {this.state.placeName} is in {this.state.lat} by {this.state.lon}
            </p>
          )}
          {this.state.displayMap && (
            <Image
              src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${this.state.lat},${this.state.lon}&zoom=${this.state.zoom}&size=600x250`}
              rounded
            />
          )}
        </main>
        {this.state.displayErr && (
          <>
            <Modal show={true}>
              <Modal.Header>
                <Modal.Title>inavalid entry</Modal.Title>
              </Modal.Header>
              <Modal.Body>city name not found</Modal.Body>
            </Modal>
          </>
        )}
      </body>
    );
  }
}

export default App;
