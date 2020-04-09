import React from 'react';
import ApiService from "../services/ApiService";
import Form from 'react-bootstrap/Form';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';

class AddComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : 'password',
            enabled: false,
            message: null,
        }
        this.saveUser = this.saveUser.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    saveUser = (e) => {
        e.preventDefault();
        let user = {username: this.state.username, password: this.state.password, enabled: this.state.enabled};
        ApiService.addUser(user)
            .then(()=> ApiService.getUsers())
            .then(res => {
                this.props.reloadUserList(res.data);
                this.close();
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({
            showModal: true,
            username: '',
            password: 'password',
            enabled: false,});
    }

    render() {
        return (
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header>
                    <Modal.Title>Add User</Modal.Title>
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
                            <Form.Control type="text" name="enabled" value={this.state.enabled} onChange={this.onChange} required />
                        </Form.Group>

                        <Button variant="primary" onClick={this.saveUser}>Save</Button>
                        <Button variant="dark" onClick={this.close}>Cancel</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default AddComponent;