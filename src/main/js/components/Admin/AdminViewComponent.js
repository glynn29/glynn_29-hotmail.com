import React from "react";
import ApiService from "../../services/ApiService";
import AdminAddComponent from "./AdminAddComponent";
import AdminEditComponent from "./AdminEditComponent";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

class AdminViewComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users: [],
            organizationList:[],
        };
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.reloadUserList = this.reloadUserList.bind(this);
        this.addComponent = React.createRef();
        this.editComponent = React.createRef();
    }

    componentDidMount() {
        ApiService.getUsers().then(res => {
            this.setState({users: res.data.filter(user => user.proctorId != null)});
            console.log("got users");
        });
        ApiService.getOrganizations().then(res => {
                let organizations = res.data;
                this.setState({organizationList: organizations});
            }
        ).then(() =>
            console.log("Found " + this.state.organizationList.length + " organizations")
        );

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
        this.editComponent.current.open(userId);
    }

    addUser() {
        this.addComponent.current.open();
    }

    render() {
        return (
            <div>
                <h1>Proctor Dashboard</h1>
                <h1>Users List</h1>
                <div id="centerButtons">
                    <Button onClick={() => this.addUser()}>Add Proctor</Button>
                </div>
                <AdminAddComponent reloadUserList={this.reloadUserList} ref={this.addComponent} organizationList={this.state.organizationList}/>
                <AdminEditComponent reloadUserList={this.reloadUserList} ref={this.editComponent} organizationList={this.state.organizationList}/>
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

export default AdminViewComponent;