import React, {useState} from "react";
import {Navbar, Nav, Form, Button} from "react-bootstrap";
import {Link, Route} from 'react-router-dom';
import ApiService from "../services/ApiService";
import ViewComponent from "./ViewComponent";

class NavComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            sessionToken : '',
            role:'',
            isUser: false,
        }
    }
    componentDidMount() {
        ApiService.getLoggedInRole().then(res =>{
            const roleData = res.data;
            roleData.map(r=>
                this.setState({role: r.role}))
        }).then(()=>{
            if(this.state.role == "ROLE_ADMIN" || this.state.role == "ROLE_PROCTOR")
                this.setState({isUser: true});
        });
    }



    render() {
     return(
         <Navbar expand="xl" bg="dark" variant="dark">
             <Navbar.Brand>Check In Application</Navbar.Brand>
             <Nav>
                 <Nav.Link as={Link} to="/checkin">Check In</Nav.Link>
                 {this.state.isUser ?  <Nav.Link as={Link} to="/list">Edit Users</Nav.Link>: ''}
                 <Nav.Link as={Link} to="/">Home</Nav.Link>
             </Nav>
             <Form className="logoutForm" inline action="/logout" method="get">
                 <Button type="submit">Logout</Button>
             </Form>
         </Navbar>
     );
    }
}


export default NavComponent;