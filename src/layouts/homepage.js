import React, {Component} from 'react'
import axios from 'axios'
import Leaders from './leaders'
import './../App.css'

class HomePage extends Component {
    _isMounted = false;
    api = 'https://api.mysportsfeeds.com/v2.1/pull/nba/2020-2021-regular/standings.json';
    api2 = 'https://api.mysportsfeeds.com/v2.1/pull/nba/2020-2021-regular/date/20210207/games.json';
    token = '56308af6-0abc-4ae0-9835-595e89';
    password = 'MYSPORTSFEEDS';
    package = this.token + ':' + this.password;
    base = btoa(this.token);
    baseStr = btoa(this.package)

    constructor(){
        super()
        this.state = {
            teams: [],
            playerStats: [],
            todaysGame: [],
        }
    }

    componentDidMount = () => {
        this._isMounted = true;

        if(this._isMounted){
            this.getData();
        }
    }

    componentDidUpdate = () => {
        console.log('component updated');
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    getData = () => {
        axios.get('https://api.mysportsfeeds.com/v2.1/pull/nba/2020-2021-regular/player_stats_totals.json',
        {headers: {Authorization: `Basic ${this.baseStr}`}})
                    .then(result => {
                        this.setState({
                            teams: this.state.teams,
                            playerStats: result.data,
                            todaysGame: this.state.todaysGame,
                        })
                    })
        }

    render(){
        if(this.props.state.teams.length !== 0 && this.state.playerStats.length !== 0 && this._isMounted){
            return(
                <div style={container} className="container-fluid">
                    <div className="row">
                    <div style={{background:"#78bcff"}} className="col-6">
                        <div className="row">
                            <h4 style={{color:"ghostwhite", marginBottom:"1em", background:"dodgerblue", textAlign:"center", padding:"15px"}}>Eastern Conference</h4>
                            {this.props.east.map((teams, i) => {
                                if(i === this.props.east.length - 1){
                                    return (
                                        <div style={standings} key={i} className="col-12">
                                            <div className="card" style={{borderRadius:"0", border:"none", background:"transparent"}}>
                                                <div className="card-body" style={{color: teams.team.teamColoursHex[1]}}>
                                                <span style={{background: "black", color: "ghostwhite", marginRight:"1em"}} className="badge">{teams.conferenceRank.rank}</span>
                                                   <img src={teams.team.officialLogoImageSrc} style={{borderRadius:"30px", height:"50px", width:"auto", marginRight:"1em"}}/>
                                                    {/* {teams.team.name}  */}
                                                </div>
                                            </div>
                                        </div>
                                        )
                                } else {

                                    return (
                                        <div style={standings} key={i} className="col-12">
                                            <div className="card" style={{borderRadius:"0", border:"none", background:"transparent", borderBottom:"1px solid ghostwhite"}}>
                                                <div className="card-body" style={{color: teams.team.teamColoursHex[1]}}>
                                                <span style={{background: "black", color: "ghostwhite", marginRight:"1em"}} className="badge">{teams.conferenceRank.rank}</span>
                                                   <img src={teams.team.officialLogoImageSrc} style={{borderRadius:"30px", height:"50px", width:"auto", marginRight:"1em"}}/>
                                                    {/* {teams.team.name}  */}
                                                </div>
                                            </div>
                                        </div>
                                        )
                                }
                            })}
                        </div>
                        </div>
                        <div style={{background:"#ff6666"}} className="col-6">
                        <div className="row">
                            {/* {this.props.west.map((nbateam, i) => {
                            if(nbateam.conferenceRank.rank < 8 && nbateam.conferenceRank.conferenceName === 'Western'){
                                arr2.push(nbateam);
                                arr2.sort((a,b) => {return a.conferenceRank.rank - b.conferenceRank.rank} )
                                }
                            })} */}
                            <h4 style={{color:"ghostwhite", marginBottom:"1em", textAlign:"center", background:"red", padding:"15px"}}>Western Conference</h4>
                            {this.props.west.map((teams, i) => {
                                if(i === this.props.west.length - 1){
                                    return (
                                        <div style={standings} key={i} className="col-12">
                                            <div className="card" style={{borderRadius:"0", border:"none", background:"transparent"}}>
                                                <div style={{color: teams.team.teamColoursHex[1]}} className="card-body">
                                                <span style={{background: "black", color: "ghostwhite", marginRight:"1em"}} className="badge">{teams.conferenceRank.rank}</span>
                                                <img style={{borderRadius:"30px", height:"50px", width:"auto", marginRight:"1em"}} src={teams.team.officialLogoImageSrc} />                                               
                                                    {/* {teams.team.name}  */}
                                                </div>
                                            </div>
                                        </div>
                                        )
                                } else {

                                    return (
                                        <div style={standings} key={i} className="col-12">
                                            <div className="card" style={{borderRadius:"0", border:"none", background:"transparent", borderBottom:"1px solid ghostwhite"}}>
                                                <div style={{color: teams.team.teamColoursHex[1]}} className="card-body">
                                                <span style={{background: "black", color: "ghostwhite", marginRight:"1em"}} className="badge">{teams.conferenceRank.rank}</span>
                                                <img style={{borderRadius:"30px", height:"50px", width:"auto", marginRight:"1em"}} src={teams.team.officialLogoImageSrc} />                                               
                                                    {/* {teams.team.name}  */}
                                                </div>
                                            </div>
                                        </div>
                                        )
                                }
                            })}
                        </div>
                        </div>
                    </div>
                    <Leaders playerStats={this.state.playerStats} teams={this.state.teams}/>
                </div>


            )

        } else {
            return(
                <div style={container} className="container-fluid">
                    <div className="row">
                    <div className="col-5">
                        <h2>Loading</h2>
                        </div>
                        <div className="col-7">
                            <h2>Loading</h2>
                        </div>
    
                    </div>
                </div>
            )
        }
    }
}

const container = {
    
}
const statLeaders = {
    padding: "1.3em",
    borderBottom: "1px solid #f4f4f4",
}
const standings = {

}

export default HomePage