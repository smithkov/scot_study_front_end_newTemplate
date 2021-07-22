import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { Styles } from "./styles/contact.js";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class GoogleMap extends Component {
  static defaultProps = {
    center: {
      lat: 55.97294,
      lng: -3.17222,
    },
    zoom: 13,
  };

  render() {
    return (
      <Styles>
        {/* Google Map */}
        <div className="google-map-area">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: `${process.env.REACT_APP_MAP_KEY}`,
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <AnyReactComponent lat={55.97294} lng={-3.17222} text="Office" />
          </GoogleMapReact>
        </div>
      </Styles>
    );
  }
}

export default GoogleMap;
