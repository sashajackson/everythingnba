import React, {Component} from 'react'
import {createBrowserHistory} from 'history'

class Leaders extends Component {
    _isMounted = false;
    _history = createBrowserHistory({forceRefresh:true});
    western = [];
    eastern = [];
    wPPG = [];
    ePPG = [];
    astE = [];
    astW = [];
    rbE = [];
    rbW = [];

    constructor(){
        super();
        this.state = {
            loaded: false,
        }
    }

componentDidMount = () => {
        this._isMounted = true;
        this.getPPGLeaders();
        this.setState({
            loaded: true,
        })
    }

componentWillUnmount = () => {
        this._isMounted = false;
    }

componentDidUpdate = () => {
        console.log('component updated');
}

getPPGLeaders = () => {
        let arr = this.props.playerStats.playerStatsTotals.sort((a,b) => {
            return a.stats.fieldGoals.fgMadePerGame - b.stats.fieldGoals.fgMadePerGame
        })

        this.ppgLeaders = arr;
        this.props.teams.forEach(val => {
            if(val.conferenceRank.conferenceName === 'Eastern'){
                this.eastern.push(val);
            } else {
                this.western.push(val);
            }
        })

        //western conference ids are 96-110
        //eastern conference ids are 81-94
        for(var i = arr.length - 1; i > -1; i--){
            if(arr[i].team.id >= 81 && arr[i].team.id <= 94){
                this.ePPG.push(arr[i]);
            } else if(arr[i].team.id >= 96 && arr[i].team.id <= 110){
                this.wPPG.push(arr[i]);
            }
        }
        // let astE = this.ePPG;
        // let astW = this.wPPG;
        // let rebE = this.ePPG;
        // let rebW = this.wPPG;
        // this.ale = astE.sort((a,b) => {
        //     return a.stats.offense.astPerGame - b.stats.offense.astPerGame
        // })
        // this.alw = astW.sort((a,b) => {
        //     return a.stats.offense.astPerGame - b.stats.offense.astPerGame
        // })
        // let rbLeadersE = rebE.sort((a,b) => {
        //     return a.stats.offense.rebPerGame - b.stats.offense.rebPerGame
        // })
        // let rbLeadersW = rebW.sort((a,b) => {
        //     return a.stats.rebounds.rebPerGame - b.stats.rebounds.rebPerGame
        // })
        // console.log(astLeadersE[astLeadersE.length-1])
        // console.log(astLeadersW[astLeadersW.length-1])
        // console.log(this.ePPG);
        // console.log(this.wPPG);
        this.getAstLeaders();
    }

getAstLeaders = () => {
    let arr = this.props.playerStats.playerStatsTotals.sort((a,b) => {
        return a.stats.offense.astPerGame - b.stats.offense.astPerGame
    })
    for(var i = arr.length - 1; i > -1; i--){
        if(arr[i].team.id >= 81 && arr[i].team.id <= 94){
            this.astE.push(arr[i]);
        } else if(arr[i].team.id >= 96 && arr[i].team.id <= 110){
            this.astW.push(arr[i]);
        }
    }

    // console.log(this.astE[0]);
    // console.log(this.astW[1]);

    this.getRebLeaders();

}

getRebLeaders = () => {
    let arr = this.props.playerStats.playerStatsTotals.sort((a,b) => {
        return a.stats.rebounds.rebPerGame - b.stats.rebounds.rebPerGame
    })
    for(var i = arr.length - 1; i > -1; i--){
        if(arr[i].team.id >= 81 && arr[i].team.id <= 94){
            this.rbE.push(arr[i]);
        } else if(arr[i].team.id >= 96 && arr[i].team.id <= 110){
            this.rbW.push(arr[i]);
        }
    }
}

render(){

        if(this.state.loaded && this._isMounted){
            console.log('everything is loaded')
            return (
                <div>
                <div className="row">
                    <div style={{background:"black"}} className="col-12">
                    <h6 style={{background:"black", color:"ghostwhite", padding:"15px", textAlign:"center", fontSize:"20px"}}>Conference Leaderboards</h6>
                    </div>
                    <div style={{background:"#78bcff", textAlign:"center"}} className="col-6" id="easternppg">
                        <h5 style={{textAlign:"center", marginTop:"1em"}}>{this.ePPG[0].player.lastName}, {this.ePPG[0].player.firstName} {this.ePPG[0].player.primaryPosition}</h5>
                        <h2 style={{fontWeight:"bold", textAlign:"center"}}>{this.ePPG[0].stats.offense.ptsPerGame}PPG</h2>
                        <img src={this.ePPG[0].player.officialImageSrc} className="img-fluid"/>
                    </div>
                    <div style={{background:"#ff6666", textAlign:"center"}} className="col-6" id="westernppg">
                    <h5 style={{textAlign:"center", marginTop:"1em"}}>{this.wPPG[0].player.lastName},{this.wPPG[0].player.firstName} {this.wPPG[0].player.primaryPosition}</h5>
                    <h2 style={{fontWeight:"bold", textAlign:"center"}}>{this.wPPG[0].stats.offense.ptsPerGame}PPG</h2>
                    <img src={this.wPPG[0].player.officialImageSrc} className="img-fluid"/>
                    </div>
                </div>

                <div className="row">
                    <div style={{background:"#78bcff", textAlign:"center"}} className="col-6 mt-2">
                        <h5 style={{textAlign:"center", marginTop:"1em"}}>{this.astE[0].player.lastName}, {this.astE[0].player.firstName} {this.astE[0].player.primaryPosition}</h5>
                        <h2 style={{fontWeight:"bold", textAlign:"center"}}>{this.astE[0].stats.offense.astPerGame}APG</h2>
                        <img src={this.astE[0].player.officialImageSrc} className="img-fluid"/>
                    </div>
                    <div style={{background:"#ff6666", textAlign:"center"}} className="col-6 mt-2">
                        <h5 style={{textAlign:"center", marginTop:"1em"}}>{this.astW[1].player.lastName}, {this.astW[1].player.firstName} {this.astW[1].player.primaryPosition}</h5>
                        <h2 style={{fontWeight:"bold", textAlign:"center"}}>{this.astW[1].stats.offense.astPerGame}APG</h2>
                        <img src={this.astW[1].player.officialImageSrc} className="img-fluid"/>
                    </div>
                </div>

                <div className="row">
                    <div style={{background:"#78bcff", textAlign:"center"}} className="col-6 mt-2">
                        <h5 style={{textAlign:"center", marginTop:"1em"}}>{this.rbE[0].player.lastName}, {this.rbE[0].player.firstName} {this.rbE[0].player.primaryPosition}</h5>
                        <h2 style={{fontWeight:"bold", textAlign:"center"}}>{this.rbE[0].stats.rebounds.rebPerGame}RPG</h2>
                        <img src={this.rbE[0].player.officialImageSrc} className="img-fluid"/>
                    </div>
                    <div style={{background:"#ff6666", textAlign:"center"}} className="col-6 mt-2">
                        <h5 style={{textAlign:"center", marginTop:"1em"}}>{this.rbW[0].player.lastName}, {this.rbW[0].player.firstName} {this.rbW[0].player.primaryPosition}</h5>
                        <h2 style={{fontWeight:"bold", textAlign:"center"}}>{this.rbW[0].stats.rebounds.rebPerGame}RPG</h2>
                        <img src={this.rbW[0].player.officialImageSrc} className="img-fluid"/>
                    </div>
                </div>

                </div>
            )

        } else {
            return (
                <h1>Loading</h1>

            )
        }
    }
}

export default Leaders