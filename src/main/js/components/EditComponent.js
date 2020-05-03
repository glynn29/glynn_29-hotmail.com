import React from 'react';
import ApiService from "../services/ApiService";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


class EditComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {};
        this.saveUser = this.saveUser.bind(this);
        this.loadUser = this.loadUser.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    loadUser() {
        ApiService.getUserById(this.state.userId)
            .then(res => {
                let person = res.data;
                let user = person.user;
                let info = person.info;
                this.setState({
                    username: user.username,
                    password: '',
                    enabled: user.enabled,

                    gpa: info.gpa,
                    weeklyHours: (info.weeklyHours / 60),
                    completedHours: info.completedHours,
                });
            })
    }

    saveUser = (e) => {
        e.preventDefault();
        let user = {username: this.state.username, password: this.state.password, enabled: this.state.enabled};
        let info = {user_info_id: this.state.user_info_id, weeklyHours: (this.state.weeklyHours * 60),  completedHours: this.state.completedHours,gpa: this.state.gpa};
        let person = {user:user, info:info};
        ApiService.editUser(this.state.userId, person)
            .then(res => {
                console.log("errors");
                let errors = res.data.list;
                if(errors != null){
                    this.setState({errorMessage: errors});
                }else {
                    console.log("proctor save");
                    return  ApiService.getUserByProctorId(this.state.proctorId)
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
    }

    open(userId, proctorId) {
        this.loadUser();
        this.setState({ showModal: true});
        this.setState({ proctorId: proctorId});
        this.setState({ userId: userId});
    }


    render() {
        return (
            <Modal show={this.state.showModal} onHide={this.close}>
                { this.state.errorMessage &&
                <h3 className="error"> { this.state.errorMessage.map(message=><h4 key={message}>{message}</h4>)} </h3>}
                <Modal.Header>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="text" name="username" value={this.state.username} onChange={this.onChange} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="text" name="password" value={this.state.password} onChange={this.onChange} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Enabled:</Form.Label>
                            <Form.Control as="select" name="enabled" value={this.state.enabled} onChange={this.onChange} required>
                                <option value="true">true</option>
                                <option value="false">false</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>GPA</Form.Label>
                            <Form.Control type="text" name="gpa" value={this.state.gpa} onChange={this.onChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Weekly Hours</Form.Label>
                            <Form.Control type="number"  min='0' max='24' step='.5' name="weeklyHours" value={this.state.weeklyHours} onChange={this.onChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Completed Time(in minutes)</Form.Label>
                            <Form.Control type="number"  min='0' max='1440' step='15' name="completedHours" value={this.state.completedHours} onChange={this.onChange} required />
                        </Form.Group>

                        <div id="centerButtons">
                            <Button variant="primary"  onClick={this.saveUser}>Save</Button>
                            <Button variant="danger" onClick={this.close}>Cancel</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default EditComponent;