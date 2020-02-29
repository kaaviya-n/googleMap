import React from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import CurrentLocation from "./currentLocation";
import "./styles.css";

class App extends React.Component {
  state = {
    selectedPlace: null,
    activeMarker: null,
    showingInfoWindow: false,
    tagName: null
  };
  mapStyles = {
    width: "100%",
    height: "100%"
  };

  onMarkerClick = (props, marker) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <div className="App">
        <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
          <Marker onClick={this.onMarkerClick} name={"Current Location"} />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>
                {this.state.selectedPlace
                  ? this.state.selectedPlace.name
                  : null}
              </h4>
            </div>
          </InfoWindow>
        </CurrentLocation>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCe0JJkXuBADMh8VJi9EZnMEK-Jo0SMu4E"
})(App);
