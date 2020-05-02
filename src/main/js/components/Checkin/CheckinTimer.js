import React from "react";
import ApiService from "../../services/ApiService";

export class CheckinTimer extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            elapsedTime: 0,
            LoggedInId: '',
        };
        this.startCounting = this.startCounting.bind(this);
        this.checkout = this.checkout.bind(this);
    }

    getSeconds(){
        return('0' + this.state.elapsedTime % 60).slice(-2);
    }
    getMinutes(){
        return(
            Math.floor(this.state.elapsedTime / 60)
        );
    }
    getHours(){
        return(
            Math.floor(this.state.elapsedTime / 3600)
        );
    }

    startCounting(LoggedInId) {
        this.setState({LoggedInId: LoggedInId});
        console.log(this.state.LoggedInId);

        var _this = this;
        this.timer = setInterval(()=> {
            _this.setState({elapsedTime:(_this.state.elapsedTime + 1)})
        },1000)
    }

    checkout(){
        console.log(this.state.LoggedInId);
        ApiService.updateTime(this.state.LoggedInId,this.getSeconds())
            .then(()=>{
                console.log("Checked Out");
                clearInterval(this.timer);
                this.setState({elapsedTime:0})
        });
    }

    render() {
        return (
            <div>
                <h3>Time Studied:<h3>{this.getHours()}:{this.getMinutes()}:{this.getSeconds()}</h3></h3>
            </div>
        );
    }
}
