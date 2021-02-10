import React, {Component} from 'react'
import axios from 'axios'
import moment from 'moment'

class TodaysGame extends Component {

    render(){
        console.log(this.props.arr.todaysGame);
        return(
            <div className="row" style={{marginBottom:"2em"}} >
                <div className="col-12 text-center">
                {this.props.arr.todaysGame.map((elem, i) => {
                    return (
                        <div className="" style={{display:"inline-block", marginRight:"10px", textAlign:"center"
                        , padding:"10px"}} key={i}>
                        <h4 style={{color:"#FDB927"}}>
                            {elem.schedule.awayTeam.abbreviation} vs {elem.schedule.homeTeam.abbreviation} 
                        </h4>
                        <h6 style={{color:"ghostwhite"}}>at {moment(elem.schedule.startTime).format("LT")}</h6>
                        </div>
                    )
                })}
                </div>
            </div>
        )
    }
}

export default TodaysGame