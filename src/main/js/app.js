import React, {useState} from 'react';
import { BrowserRouter, Router, Route, Switch} from 'react-router-dom'
import ViewComponent from "./components/ViewComponent";
import NavComponent from "./components/NavComponent";
import MapContainer from "./components/MapContainer";
import NewUserComponent from "./components/NewUserComponent"
import Footer from "./components/Footer";
import Home from "./components/Home";
const ReactDOM = require('react-dom');

function App() {

    return (
            <BrowserRouter>
                <NavComponent/>
                <div className="container">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/list" component={ViewComponent} />
                        <Route path="/checkin" component={MapContainer}/>
                        <Route path="/newUsers" component={NewUserComponent}/>
                    </Switch>
                </div>
                <Footer/>
            </BrowserRouter>
    );
}

export default App;

ReactDOM.render(
        <App/>,
    document.getElementById('react')
);

