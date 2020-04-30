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
            LoggedInId:'',
            role:'',
            isAdmin: false,
        };
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.reloadUserList = this.reloadUserList.bind(this);
        this.addComponent = React.createRef();
        this.editComponent = React.createRef();
    }

    componentDidMount() {
        ApiService.getLoggedInId().
        then(res =>{
            const id = res.data;
            console.log("id found: " + id);
            this.setState({LoggedInId: id});
            window.localStorage.setItem("LoggedInId", id);
        })
        .then(()=>{
            const id = this.state.LoggedInId;

            const role = window.localStorage.getItem("role");
            console.log(role);
            if(role == "ROLE_ADMIN"){//if admin
                this.setState({isAdmin:true});
                return ApiService.getUsers();
            }else{//if regular proctor
                return ApiService.getUserByProctorId(id);
            }
        })
            .then(res => {
                const users = res.data;
                this.setState({users: users});
                console.log("got users, is admin?: " + this.state.isAdmin);
            });
    }

    reloadUserList(users) {
        this.setState({users: users})
    }

    deleteUser(userId) {
        ApiService.deleteUser(userId)
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
        const id = window.localStorage.getItem("LoggedInId");
        this.addComponent.current.open(id);
    }



    render() {
        const isAdmin = this.state.isAdmin;
        return (
            <div>
                <h1 >Proctor Dashboard</h1>
                <h1>Users List</h1>
                <Button onClick={() => this.addUser()}>Add User</Button>
                <AddComponent reloadUserList={this.reloadUserList} ref={this.addComponent} isAdmin={isAdmin} />
                <EditComponent reloadUserList={this.reloadUserList} ref={this.editComponent} isAdmin={isAdmin}/>
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