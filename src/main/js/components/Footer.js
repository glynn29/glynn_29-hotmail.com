import React from "react";
import {Navbar,Container,NavbarBrand} from "react-bootstrap";
class Footer extends React.Component {
    render() {
        return (
            <div className="fixed-bottom">
                <Navbar expand="xl" bg="dark" variant="dark">
                    <Container className="justify-content-center">
                        <NavbarBrand >{"Glynn Leininger - Copyright © " + new Date().getFullYear() + "."}</NavbarBrand>
                    </Container>
                </Navbar>
            </div>
        )
    }
}
export default Footer;