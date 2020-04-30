import React from 'react';
import ApiService from "../services/ApiService";
import Form from 'react-bootstrap/Form';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';

class AddComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            username : '',
            password : '',
            enabled: '',
            user_info_id: '',
            weeklyHours: '',
            completedHours: '',
            gpa: '',
            LoggedInId:'',
            isAdmin:'',
            errorMessage:'',
            organization:1,
            organizationList: [],
        };

        this.saveUser = this.saveUser.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    componentDidMount() {
        ApiService.getOrganizations().then(res => {
                let organizations = res.data;
                this.setState({organizationList: organizations});
            }
        ).then(()=>
        console.log(this.state.organizationList));
    }

    saveUser = (e) => {
        e.preventDefault();
        console.log(this.state.LoggedInId);
        //let organization = {id: this.state.organization};
        let user = {username: this.state.username, password: this.state.password, enabled: this.state.enabled, proctorId: this.state.LoggedInId, organization: this.state.organization};
        let info = {user_info_id: this.state.user_info_id, weeklyHours: (this.state.weeklyHours * 60),  completedHours: this.state.completedHours, gpa: this.state.gpa};
        let person = {user:user, info:info};
        ApiService.addCompleteUser(person)
            .then(res => {
                console.log(res);
                let error = res.data.status;
                if(!(error==null)){
                    this.setState({errorMessage: res.data.list});
                }else {

                    ApiService.getUserID(user.username)
                        .then(res => {this.setState({user_info_id : res.data})})
                        //.then(() => ApiService.addInfo(this.state.user_info_id, info))
                        .then(()=>{
                            const id = window.localStorage.getItem("LoggedInId");
                            console.log("id is: " + id);
                            console.log("isAdmin? props: " + this.props.isAdmin);
                            if(this.props.isAdmin){//if admin
                                console.log("admin save");
                                return ApiService.getUsers();
                            }else{//if regular proctor
                                console.log("proc save");
                                return ApiService.getUserByProctorId(id);
                            }
                        })
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

    open(procId) {
        console.log("id is on open: " + procId);
        this.setState({
            showModal: true,
            username: '',
            password: 'password',
            enabled: true,
            gpa: 3.0,
            completeHours: 0,
            weeklyHours: 2,
            LoggedInId: procId,
        });
    }

    render() {
        return (
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header>
                    <Modal.Title>Add User</Modal.Title>
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
                                {this.state.organizationList.map(org =>
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


                        <Button variant="primary" onClick={this.saveUser}>Save</Button>
                        <Button variant="dark" onClick={this.close}>Cancel</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default AddComponent;