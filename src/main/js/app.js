import React from 'react';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom'
import ViewComponent from "./components/ViewComponent";
import NavComponent from "./components/NavComponent";
import MapContainer from "./components/MapContainer";
const ReactDOM = require('react-dom');




function App() {
    return (
        <div className="container">
            <BrowserRouter>
                <NavComponent/>

                    <h1>Proctor Dashboard</h1>
                    <Switch>
                        <Route path="/" exact component={ViewComponent} />
                        <Route path="/list" component={ViewComponent} />
                        <Route path="/checkin" component={MapContainer}/>
                    </Switch>

            </BrowserRouter>
        </div>
    );
}

export default App;

ReactDOM.render(
        <App/>,
    document.getElementById('react')
);

