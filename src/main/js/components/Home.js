import React from "react";
import ApiService from "../services/ApiService";
class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            LoggedInId:'',
            weeklyHours: 0,
            completedHours: 0,
            remainingHours:0
        };
    }

    componentDidMount() {
        ApiService.getLoggedInId().
        then(res =>{
            const id = res.data;
            console.log("id found: " + id);
            this.setState({LoggedInId: id});
            window.localStorage.setItem("LoggedInId", id);
        }).then(()=>ApiService.getInfo(this.state.LoggedInId))
        .then(res=>{
            const info = res.data;
            console.log("info: " + info);

            const weeklyMinutes = info.weeklyHours;
            const completeMinutes = info.completedHours;

            let calc = weeklyMinutes - completeMinutes;
            let remainingMin = ('0' + calc % 60).slice(-2);
            let remainingHour = Math.floor(calc/ 60);

            let completedMin = ('0' + completeMinutes % 60).slice(-2);
            let completedHour = Math.floor(completeMinutes/ 60);

            this.setState({weeklyHours: (info.weeklyHours/60)});
            this.setState({remainingHours: (remainingHour + ':' + remainingMin)});
            this.setState({completedHours: (completedHour + ':' + completedMin)});
        });
    }

    render() {
        return(

            <div>
                <h2> Weekly Hours: {this.state.weeklyHours}</h2>
                <h2> Completed Time: {this.state.completedHours}</h2>
                <h2> Remaining Time: {this.state.remainingHours}</h2>

            </div>

        );
    }
}
export default Home;