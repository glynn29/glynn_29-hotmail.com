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
            password: '',
            enabled: '',
            user_info_id: '',
            weeklyHours: '',
            completedHours: '',
            gpa: '',
        };
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
            }).then(()=> ApiService.getInfo(this.state.id))
            .then((res) => {
                let info = res.data;
                this.setState({
                    user_info_id: this.state.id,
                    gpa: info.gpa,
                    weeklyHours: (info.weeklyHours / 60),
                    completedHours: info.completedHours,
                })
            })
    }

    saveUser = (e) => {
        e.preventDefault();

        let user = {id: this.state.id, username: this.state.username, password: this.state.password, enabled: this.state.enabled};
        let info = {user_info_id: this.state.user_info_id, weeklyHours: (this.state.weeklyHours * 60),  completedHours: this.state.completedHours,gpa: this.state.gpa};

        ApiService.editUser(user)
            .then(()=> ApiService.editInfo(info))
            .then(()=>{
                const id = window.localStorage.getItem("proctorId");
                if(id == 1){//if admin
                    return ApiService.getUsers();
                }else{//if regular proctor
                    return ApiService.getUserByProctorId(id);
                }
            })
            .then(res => {
                this.props.reloadUserList(res.data);
                this.close();
            });
    };

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
                            <Form.Label>Enabled:</Form.Label>
                            <Form.Control type="text" name="enabled" value={this.state.enabled} onChange={this.onChange} required/>
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
                        <Button variant="primary"  onClick={this.saveUser}>Save</Button>
                        <Button variant="dark" onClick={this.close}>Cancel</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default EditComponent;