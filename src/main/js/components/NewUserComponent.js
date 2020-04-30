import React from "react";
import ApiService from "../services/ApiService";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import AddInfoComponent from "./AddInfoComponent";

class NewUserComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
        this.addInfoComponent = React.createRef();
        this.reloadUserList = this.reloadUserList.bind(this);
    }

    componentDidMount() {
        ApiService.getNewUsers().then(res=>{
            this.setState({users: res.data});

        }).then(()=>{
            console.log("new users:");
            this.state.users.map(user=>console.log(user));
        })
    }

    reloadUserList(users) {
        this.setState({users: users})
    }

    deleteUser(userId) {
        ApiService.deleteUser(userId)
            .then(() => this.setState({users: this.state.users.filter(user => user.id !== userId)}))
    }

    acceptUser(userId){
        this.addInfoComponent.current.open(userId);
    }

    render() {
        return(
             <div>
                 <AddInfoComponent reloadUserList={this.reloadUserList} ref={this.addInfoComponent} />
                 {this.state.users.length > 0 ?
                     <h1>New Users List</h1>: <h1>No New Users</h1> }
                 {this.state.users.length > 0 &&
                 <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Organization</th>
                        <th>Accept</th>
                        <th>Decline</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.users.map(
                            user => <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.organization.name}</td>
                                <td>
                                    <Button variant="info" onClick={() => this.acceptUser(user.id)}> Accept</Button>
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => this.deleteUser(user.id)}> Decline</Button>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>}
            </div>
        );
    }
}
export default NewUserComponent;