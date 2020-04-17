import React from "react";
import Button from "react-bootstrap/Button";
import MapContainer from "./MapContainer";
import MapComp from "./MapComp";

export class MapComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            lat:'',
            lng:'',
            currentLocation: '',
            userLatLng: '',
        };
        //this.mapContainer = React.createRef();
        this.onMapClick = this.onMapClick.bind(this);
        this.mapComp = React.createRef();
    }

    //onClick = () =>{ this.mapContainer.current.checkin()};

    onMapClick = () =>{
        console.log(this.mapComp.current);
        this.mapComp.current.checkin()};

    render() {
        return (
            <div >
                {/*<Button onClick={() => this.onClick()}>Checkin</Button>*/}
                {/*<MapContainer ref={this.mapContainer}/>*/}
                <Button onClick={() => this.onMapClick()}>Checkin</Button>
                <div>
                    <MapComp ref={this.mapComp}/>
                </div>

            </div>

        );
    }
}


export default MapComponent;