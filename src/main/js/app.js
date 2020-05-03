import React, {useState} from 'react';
import { BrowserRouter, Router, Route, Switch} from 'react-router-dom'
import ViewComponent from "./components/ViewComponent";
import AdminViewComponent from "./components/Admin/AdminViewComponent";
import NavComponent from "./components/NavComponent";
import MapContainer from "./components/Checkin/MapContainer";
import NewUserComponent from "./components/NewUserComponent";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ApiService from "./services/ApiService";
const ReactDOM = require('react-dom');

function App() {
    const [role, setRole] = useState();
    const [isAdmin, setAdmin] = useState(false);
    const [isProctor, setProctor] = useState(false);

    ApiService.getLoggedInRole()
        .then(res =>{
            const roleData = res.data;
            roleData.map(r=>
                setRole(r.role)
            )
        }).then(()=>{
            if(role == "ROLE_ADMIN")
                setAdmin(true);
            else if(role == "ROLE_PROCTOR")
                setProctor(true);
        });


    return (
            <BrowserRouter>
                <NavComponent isAdmin={isAdmin} isProctor={isProctor}/>
                <div className="container">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        {isAdmin ?
                        <Route path="/list" component={AdminViewComponent}/>
                        :
                        <Route path="/list" component={ViewComponent} />
                        }
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

