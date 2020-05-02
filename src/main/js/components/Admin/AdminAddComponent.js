import React from 'react';
import ApiService from "../../services/ApiService";
import Form from 'react-bootstrap/Form';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';

class AdminAddComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            organization: 1,
            organizationList: [],
        };

        this.saveUser = this.saveUser.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    saveUser = (e) => {
        e.preventDefault();
        let organization = {id: this.state.organization};
        let user = {username: this.state.username, password: this.state.password, enabled: this.state.enabled, proctorId: 1, organization: organization};
        let info = {weeklyHours: (this.state.weeklyHours * 60),  gpa: this.state.gpa};
        let person = {user:user, info:info};
        ApiService.addProctor(person)
            .then(res => {
                console.log("errors");
                let errors = res.data.list;
                if(errors != null){
                    this.setState({errorMessage: errors});
                }else {
                    console.log("admin save");
                    return ApiService.getUsers()
                        .then(res => {
                            this.props.reloadUserList(res.data);
                            this.close();
                        });
                }
            });
    };

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    close() {
        this.setState({ showModal: false });
        this.setState({errorMessage:''});
    }

    open() {
        this.setState({
            showModal: true,
            username: '',
            password: 'password',
            enabled: true,
            gpa: 3.0,
            weeklyHours: 2,
        });
    }

    render() {
        return (
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header>
                    <Modal.Title>Add Proctor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        { this.state.errorMessage &&
                        <h3 className="error"> { this.state.errorMessage.map(message=><h4 key={message}>{message}</h4>)} </h3>}
                        <Form.Group>
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="text" name="username" placeholder="username" value={this.state.username} onChange={this.onChange} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="text" name="password" value={this.state.password} onChange={this.onChange} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Enabled:</Form.Label>
                            <Form.Control as="select" type="select" name="enabled" value={this.state.enabled} onChange={this.onChange} required >
                                <option>true</option>
                                <option>false</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Organization:</Form.Label>
                            <Form.Control as="select" type="select" name="organization" value={this.state.organization} onChange={this.onChange} required >
                                {this.props.organizationList.map(org =>
                                      <option key={org.id} value={org.id}>{org.name}</option>
                                )}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>GPA</Form.Label>
                            <Form.Control type="text" name="gpa" value={this.state.gpa} onChange={this.onChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Weekly Hours(in hours)</Form.Label>
                            <Form.Control type="number"  min='0' max='24' step='.5' name="weeklyHours" value={this.state.weeklyHours} onChange={this.onChange} required />
                        </Form.Group>

                        <div id="centerButtons">
                            <Button variant="outline-info" onClick={this.saveUser}>Save</Button>
                            <Button variant="danger" onClick={this.close}>Cancel</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default AdminAddComponent;