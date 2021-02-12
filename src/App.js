import './App.css'
import React, {Component} from 'react'
//components
import HomePage from './layouts/homepage'
import HeaderStats from './layouts/headerStats'
import Loader from './layouts/loader'
//tools
import {Route, Router} from 'react-router-dom'
import history from '../src/services/history'
import axios from 'axios'

class App extends Component {
  _isMounted = false;
  _nbaTeamsSorted = [];
  _east = [];
  _west = [];

  state = {
    teams: [],
    playerStats: [],
    games: [],
  }

componentDidMount = () => {
    this._isMounted = true;


    if(this._isMounted){
      
        //call to get teams from server
        axios.get('https://everythingnba.herokuapp.com/getTeams').then(result => {
            this.setState({
                teams: result.data.teams,
                playerStats: this.state.playerStats,
                games: this.state.games,
            })
                          //take all teams in east and push into array
                          this.splitTeams('Eastern');
                          this.splitTeams('Western');
          })
          //call to get todays games
          axios.get('https://everythingnba.herokuapp.com/getGames').then(result => {
              this.setState({
                teams: this.state.teams,
                playerStats: this.state.playerStats,
                games: result.data.games,
              })
          })
    }
}

componentDidUpdate = () => {
    // console.log('component updated');
}

componentWillUnmount = () => {
    this._isMounted = false;
}

splitTeams = (conference) => {
  let conferenceArray;
  if(conference === 'Eastern'){
    conferenceArray = this._east;
  } else {
    conferenceArray = this._west;
  }
  this.state.teams.map((nbateam, i) => {
    if(conference === 'Eastern'){
      if(nbateam.conferenceRank.rank <= 8 && nbateam.conferenceRank.conferenceName === 'Eastern'){
          this._east.push(nbateam);
        }
    } else if(conference === 'Western'){
      if(nbateam.conferenceRank.rank <= 8 && nbateam.conferenceRank.conferenceName === 'Western'){
        this._west.push(nbateam);
      }
    }
    })
    this._east.sort((a,b) => {
      return a.conferenceRank.rank - b.conferenceRank.rank
    })
    this._west.sort((a,b) => {
      return a.conferenceRank.rank - b.conferenceRank.rank
    })

}

  render(){
    if(this._isMounted && this.state.teams.length !== 0 && this.state.games.length !== 0){
      return (
        <div>
          <Router history={history}>
          <Route exact path="/">
          <HeaderStats games={this.state.games} teams={this.state.teams}/>
          <HomePage state={this.state} east={this._east} west={this._west}/>
          </Route>
    
          </Router>
        </div>
      );
    } else {
      return (
        <Loader />
        // <h1>Loading</h1>
      )
    }
  }
}

export default App;
