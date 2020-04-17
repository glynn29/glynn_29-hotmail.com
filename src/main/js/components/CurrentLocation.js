import React from 'react';
import ReactDOM from 'react-dom';

const mapStyles = {
    map: {
        position: 'absolute',
        width: '50%',
        height: '50%'
    }
};

export class CurrentLocation extends React.Component {
    constructor(props) {
        super(props);

        const { lat, lng } = this.props.initialCenter;
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            },
            library: '',
            circleTest: '',
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        }
    }

    recenterMap() {
        const map = this.map;
        const google = this.props.google;

        if (map) {
            let center = new google.maps.LatLng(this.state.currentLocation.lat, this.state.currentLocation.lng);

            const coords = { lat: 38.755843, lng: -93.737337 };
            let library = new google.maps.Circle({
                center: coords,
                radius: 66,//meters
                map: this.map,
                fillColor: '#0000FF',
                fillOpacity: 0.2,
                strokeColor: '#0000FF',
                strokeOpacity: 0.3
            });

            let circleTest = new google.maps.Circle({
                center: center,
                radius: 66,//meters
                map: this.map,
                fillColor: '#0000FF',
                fillOpacity: 0.2,
                strokeColor: '#0000FF',
                strokeOpacity: 0.3
            });

            this.setState({library: this.library});
            this.setState({circleTest: this.circleTest});
            map.panTo(center);
        }

    }


    componentDidMount() {
        if (this.props.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(pos => {
                    this.setState({
                        currentLocation: {
                            lat: pos.coords.latitude,
                            lng: pos.coords.longitude
                        }
                    });
                });
            }
        }
        this.loadMap();
    }

    loadMap() {
        if (this.props && this.props.google) {
            // checks if google is available
            const { google } = this.props;

            // reference to the actual DOM element
            const node = ReactDOM.findDOMNode(this.refs.map);

            let { zoom } = this.props;
            const { lat, lng } = this.state.currentLocation;
            const center = new google.maps.LatLng(lat, lng);
            const mapConfig = Object.assign(
                {},
                {
                    center: center,
                    zoom: zoom
                }
            );

            // maps.Map() is constructor that instantiates the map
            this.map = new google.maps.Map(node, mapConfig);



        }
    }

    renderChildren() {
        const { children } = this.props;

        if (!children) return;

        return React.Children.map(children, c => {
            if (!c) return;
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.currentLocation,
            });
        });
    }

    render() {
        const style = Object.assign({}, mapStyles.map);
        return (
            <div>
                <div style={style} ref="map">
                    Loading map...
                </div>
                {this.renderChildren()}
            </div>
        );
    }
}
export default CurrentLocation;

CurrentLocation.defaultProps = {
    zoom: 17,
    initialCenter: {
        lat: 38.755843,
        lng: -93.737337
    },
    centerAroundCurrentLocation: false,
    visible: true
};