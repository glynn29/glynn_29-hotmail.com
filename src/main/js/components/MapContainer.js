import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import React from "react";
import {Circle } from "react-google-maps";
import ReactDOM from 'react-dom';


const key = "AIzaSyBGH_z4B2pavP0quhO8uYvG6G4hLrWHBqQ";
const mapStyles = {
    width: '50%',
    height: '50%',
};

export class MapContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            currentLocation: '',
            userLatLng: {lat: '38.755843', lng: '-93.737337'}
        };
        this.checkin = this.checkin.bind(this);
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (prevProps.google !== this.props.google) {
    //         this.loadMap();
    //     }
    //     if (prevState.userLatLng != this.state.userLatLng) {
    //         this.getLocation();
    //     }
    // }
    componentDidMount() {
        this.getLocation();
    }

    getLocation = () =>{
        if (navigator && navigator.geolocation) {
            console.log("Nav works");
            navigator.geolocation.getCurrentPosition(position => {
                //const coords = pos.coords;
                this.setState({
                    userLatLng : new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
                    currentLocation: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                });
                console.log("lat long: " + this.state.userLatLng);
                console.log("location: " + this.state.currentLocation);
            });
        }
    };

    checkin(){
        console.log("hello from child!");
    }

    render() {
        const coords = { lat: 38.755843, lng: -93.737337 };

        return (
            <Map
                id={'map'}
                google={this.props.google}
                zoom={16}
                style={mapStyles}
                initialCenter={this.state.userLatLng}

            >
                <Marker
                    position={this.state.userLatLng}
                    name={'Current Location'}
                />

                <Circle
                    radius={66}
                    center={coords}
                    strokeColor='#0000FF'
                    strokeOpacity={0.3}
                    fillColor='#0000FF'
                    fillOpacity={0.2}
                />
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: key
})(MapContainer);