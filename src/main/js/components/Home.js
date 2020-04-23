import React from "react";
import ApiService from "../services/ApiService";
class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            role: ''
        };
    }

    componentDidMount() {
        ApiService.getLoggedInRole().then(res =>{
            const role = res.data;
            role.map(r=> {
                this.setState({role: r.role});
                window.localStorage.setItem("role", r.role);
            } );
        }).then(()=> console.log(this.state.role));
    }

    render() {
        return(
            <div>Hello</div>
        );
    }
}
export default Home;