import {Map, GoogleApiWrapper, Marker,} from 'google-maps-react';
import React from "react";
//import {Circle} from "react-google-maps";
import ReactDOM from 'react-dom';
import CurrentLocation from "./CurrentLocation";

const key = "AIzaSyBGH_z4B2pavP0quhO8uYvG6G4hLrWHBqQ";
const mapStyles = {
    width: '50%',
    height: '50%',
};

export class MapComp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
        };
        this.checkin = this.checkin.bind(this);
    }

    // state = {
    //     showingInfoWindow: false,
    //     activeMarker: {},
    //     selectedPlace: {}
    // };

    checkin(){
        console.log("hello from child!");
    }

    render() {
        const coords = { lat: 38.755843, lng: -93.737337 };

        return (
            <CurrentLocation
                checkin = {this.checkin}
                centerAroundCurrentLocation
                google={this.props.google}
            >

                <Marker
                    position={this.state.userLatLng}
                    name={'Current Location'}
                />
            </CurrentLocation>
        );
    }
}

export default GoogleApiWrapper(
    (props) => ({
            apiKey: key,
            userLatLng: this.userLatLng,
        }
    ))(MapComp)
