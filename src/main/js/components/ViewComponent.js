import React from "react";
import ApiService from "../services/ApiService";
import AddComponent from "./AddComponent";
import EditComponent from "./EditComponent";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

class ViewComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users: [],
            proctorId:0,
        };
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.reloadUserList = this.reloadUserList.bind(this);
        this.addComponent = React.createRef();
        this.editComponent = React.createRef();
    }

    componentDidMount() {
        ApiService.getLoggedInId()
            .then(res =>{
                const id = res.data;
                console.log("proctor id found: " + id);
                this.setState({proctorId: id});
            })
            .then(()=> ApiService.getUserByProctorId(this.state.proctorId))
                .then(res => {
                    const users = res.data;
                    this.setState({users: users});
                    console.log("got users");
                });
    }

    reloadUserList(users) {
        this.setState({users: users})
    }

    deleteUser(userId) {
        ApiService.deleteUser(userId)
            .then(() => {
                this.setState({users: this.state.users.filter(user => user.id !== userId)});
            })
    }

    editUser(userId) {
        this.editComponent.current.open(userId, this.state.proctorId);
    }

    addUser() {
        this.addComponent.current.open(this.state.proctorId);
    }



    render() {
        return (
            <div>
                <h1 >Proctor Dashboard</h1>
                <h1>Users List</h1>
                <div id="centerButtons">
                    <Button onClick={() => this.addUser()}>Add User</Button>
                </div>
                <AddComponent reloadUserList={this.reloadUserList} ref={this.addComponent} />
                <EditComponent reloadUserList={this.reloadUserList} ref={this.editComponent} />
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>User Name</th>
                            <th>Organization</th>
                            <th>Enabled</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.users.map(
                            user => <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.organization.name}</td>
                                <td>{user.enabled.toString()}</td>
                                <td>
                                    <Button variant="info" onClick={() => this.editUser(user.id)}> Edit</Button>
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => this.deleteUser(user.id)}> Delete</Button>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ViewComponent;