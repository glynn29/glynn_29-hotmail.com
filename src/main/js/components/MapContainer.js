import React from "react";
import {Button} from "react-bootstrap";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Circle } from "react-google-maps"
import {compose, withProps} from "recompose";
import {CheckinTimer} from "./CheckinTimer"
const key = "AIzaSyBGH_z4B2pavP0quhO8uYvG6G4hLrWHBqQ";
const mapStyles = {
    width: '50%',
    height: '50%',
};

export class MapContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            currentLatLng: {lat: '38.755843', lng: '-93.737337'},
            checkinArray: [],
        };
        this.libCircle = React.createRef();
        this.testCircle = React.createRef();
        this.timer = React.createRef();
    };

    componentDidMount() {
        this.showCurrentLocation();
    }

    showCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.setState(prevState => ({
                        currentLatLng: {
                            ...prevState.currentLatLng,
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        },
                    }));
                    this.createCircles();
                }
            );
        }
    };

    createCircles(){
        const libCoords = { lat: 38.755843, lng: -93.737337 };
        let libCircle = <Circle
            ref={this.libCircle}
            id={"lib"}
            radius={66}
            center={libCoords}
            strokeColor='#0000FF'
            strokeOpacity={0.3}
            fillColor='#0000FF'
            fillOpacity={0.2}/>;

        let testCircle = <Circle
            ref={this.testCircle}
            id={"testCircle"}
            radius={66}
            center={{lat: this.state.currentLatLng.lat, lng: this.state.currentLatLng.lng}}
            strokeColor='#0000FF'
            strokeOpacity={0.3}
            fillColor='#0000FF'
            fillOpacity={0.2}
        />;

        this.setState({checkinArray:  [...this.state.checkinArray, libCircle]});
        this.setState({checkinArray:  [...this.state.checkinArray, testCircle]});

    }

    checkin(){
        console.log("Checkin");
        let bounds = this.testCircle.current.getBounds();
        let inside = false;
        inside = bounds.contains(this.state.currentLatLng);
        if(inside) {
            console.log(inside);
            this.timer.current.startCounting();
        }
    }

    checkout(){
        this.timer.current.checkout();
    }

    render() {
        const libCoords = { lat: 38.755843, lng: -93.737337 };
        const InnerMapInstance = compose(
            withProps({
                googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBGH_z4B2pavP0quhO8uYvG6G4hLrWHBqQ",
                loadingElement: <div style={{height: `100%`}}/>,
                containerElement: <div style={{height: `400px`}}/>,
                mapElement: <div style={{height: `100%`}}/>,
            }),
            withScriptjs,
            withGoogleMap
        )((props) =>
            <GoogleMap
                defaultZoom={16}
                center={{lat: props.currentLocation.lat, lng: props.currentLocation.lng}}
            >
                {props.checkinArray.map(circle => circle) }

                {<Marker position={{lat: props.currentLocation.lat, lng: props.currentLocation.lng}}/>}
            </GoogleMap>
        );

        return (
        <div>
            <CheckinTimer ref={this.timer}/>
            <Button onClick={() => this.checkin()}>Checkin </Button>
            <Button onClick={() => this.checkout()}>CheckOut</Button>
            <div>
                <InnerMapInstance currentLocation={this.state.currentLatLng} checkinArray={this.state.checkinArray}/>
            </div>
        </div>


        );
    }
}

export default MapContainer;