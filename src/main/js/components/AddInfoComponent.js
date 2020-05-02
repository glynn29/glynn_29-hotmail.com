import React from 'react';
import ApiService from "../services/ApiService";
import Form from 'react-bootstrap/Form';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';

class AddInfoComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage:'',
            proctorId:'',
        };
        this.saveInfo = this.saveInfo.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    saveInfo(){
        let info= {gpa: this.state.gpa, completedHours: 0, weeklyHours: (this.state.weeklyHours*60)};
        ApiService.getLoggedInId()
            .then(res =>{
                const id = res.data;
                console.log("Proctor id found: " + id);
                this.setState({proctorId: id});
            }).then(() => ApiService.addInfo(this.state.userId, this.state.proctorId, info))
            .then(res => {

                let errors = res.data.list;
                if(errors != null){
                    console.log("errors");
                    this.setState({errorMessage: errors});
                }else {
                    ApiService.getNewUsers()
                        .then(res => {
                            this.props.reloadUserList(res.data);
                            this.close();
                        });
                }
            });

    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    close() {
        this.setState({ showModal: false });
        this.setState({errorMessage:''});
    }

    open(userId) {
        console.log("id is on open: " + userId);
        this.setState({
            userId: userId,
            showModal: true,
            gpa: 3.0,
            completeHours: 0,
            weeklyHours: 2,
        });
    }

    render() {
        return(
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header>
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        { this.state.errorMessage &&
                        <h3 className="error"> { this.state.errorMessage.map(message=><h4 key={message}>{message}</h4>)} </h3>}

                        <Form.Group>
                            <Form.Label>GPA</Form.Label>
                            <Form.Control type="text" name="gpa" value={this.state.gpa} onChange={this.onChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Weekly Hours(in hours)</Form.Label>
                            <Form.Control type="number"  min='0' max='24' step='.5' name="weeklyHours" value={this.state.weeklyHours} onChange={this.onChange} required />
                        </Form.Group>

                        <div id="centerButtons">
                            <Button variant="success" onClick={this.saveInfo}>Save</Button>
                            <Button variant="danger" onClick={this.close}>Cancel</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}
export default AddInfoComponent;