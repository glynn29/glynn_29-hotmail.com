import React from "react";
import {Navbar, Nav, Form, Button} from "react-bootstrap";
import { Link } from 'react-router-dom';

class NavComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            sessionToken : '',
        }
    }

    render() {
     return(
         <Navbar expand="xl" bg="dark" variant="dark">
             <Navbar.Brand>Check In Application</Navbar.Brand>
             <Nav>
                 <Nav.Link as={Link} to="/checkin">Check In</Nav.Link>
                 <Nav.Link as={Link} to="/list">Edit Users</Nav.Link>
                 <Nav.Link as={Link} to="/">Home</Nav.Link>
             </Nav>
             <Form action="/logout" method="get" className="align-right">
                 <Button className="align-right" type="submit">Logout</Button>
             </Form>
         </Navbar>
     );
    }
}


export default NavComponent;