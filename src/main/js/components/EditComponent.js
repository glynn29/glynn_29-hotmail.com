import React from 'react';
import ApiService from "../services/ApiService";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

class EditComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            username : '',
            password : '',
            enabled: false,
        }
        this.saveUser = this.saveUser.bind(this);
        this.loadUser = this.loadUser.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    loadUser() {
        ApiService.getUserById(window.localStorage.getItem("userId"))
            .then((res) => {
                let user = res.data;
                this.setState({
                    id: user.id,
                    username: user.username,
                    password: user.password,
                    enabled: user.enabled,
                })
            })
    }

    saveUser = (e) => {
        e.preventDefault();
        let user = {id: this.state.id, username: this.state.username, password: this.state.password, enabled: this.state.enabled};
        ApiService.editUser(user)
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
        this.loadUser();
        this.setState({ showModal: true});
    }


    render() {
        return (
            <Modal show={this.state.showModal} onHide={this.close}>
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
                            <Form.Control type="text" name="enabled" value={this.state.enabled} onChange={this.onChange} required/>
                        </Form.Group>

                        <Button variant="primary"  onClick={this.saveUser}>Save</Button>
                        <Button variant="dark" onClick={this.close}>Cancel</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default EditComponent;