import ApiService from "../services/ApiService";
import AddComponent from "./AddComponent";
import EditComponent from "./EditComponent";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
const React = require('react');

class ViewComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users: [],
            message: null,
        };
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.reloadUserList = this.reloadUserList.bind(this);
        this.addComponent = React.createRef();
        this.editComponent = React.createRef();
    }

    componentDidMount() {
        ApiService.getUsers()
            .then(res => {
                const users = res.data;
                this.setState({users: users});
            })
    }

    reloadUserList(users) {
        this.setState({users: users})
    }

    deleteUser(userId) {
        ApiService.deleteInfo(userId)
            //.then(()=>ApiService.deleteUser(userId))
            .then(res => {
                this.setState({message : 'User deleted successfully.'});
                this.setState({users: this.state.users.filter(user => user.id !== userId)});
            })

    }

    editUser(userId) {
        window.localStorage.setItem("userId", userId);
        this.editComponent.current.open();
    }

    addUser() {
        window.localStorage.removeItem("userId");
        this.addComponent.current.open();
    }



    render() {
        return (
            <div>
                <h1>Users List</h1>
                <Button onClick={() => this.addUser()}>Add User</Button>
                <AddComponent reloadUserList={this.reloadUserList} ref={this.addComponent}/>
                <EditComponent reloadUserList={this.reloadUserList} ref={this.editComponent}/>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>User Name</th>
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
                                <td>{user.enabled.toString()}</td>
                                <td>
                                    <Button variant="info" onClick={() => this.editUser(user.id)}> Edit</Button>
                                </td>
                                <td>
                                    <Button variant="success" onClick={() => this.deleteUser(user.id)}> Delete</Button>
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