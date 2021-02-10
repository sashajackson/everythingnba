import React, { Component } from 'react'


class HeaderStats extends Component {
    _isMounted = false;
    _didUpdate = false;

    constructor(){
        super();
        this.state = {
            games: [],
            teams: [],
        }
    }


    componentDidMount = () => {
        this._isMounted = true;
        if(this._isMounted){
            console.log(this.props.games);
            this.setState({
                games: this.props.games,
                teams: this.props.teams,
            })
            console.log('headerStat component updated');
        }
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    componentDidUpdate = () => {
        console.log('headerStats component updated');
        this._didUpdate = true;
        // this.recursiveSlideshow();
    }

    recursiveSlideshow = (index = 0) => {
        let that = this;
        let carousel = document.getElementById('carousel-inner');
        carousel.innerHTML = '';
        console.log('recursive function initiated ', index);
        if(index === this.props.games.length){
            return (
                carousel.innerHTML = 'end of slideshow'
            )
        }

        let item = document.createElement('div');
        item.className = 'carousel-item';
        // carousel.append(item);
        carousel.innerHTML = this.props.games[index].schedule.homeTeam.abbreviation;
        setTimeout(function(){
            that.recursiveSlideshow(++index);           
        }, 2000)
        console.log(this.props);
    }

    rs = (teamId) => {
        let team = this.getTeamId(teamId);
        return team[0].team.name;
    }

    getTeamId = (id) => {
        let team = this.props.teams.filter(identify => {
            return identify.team.id === id;
        })

        return team;
    }

    render(){
        if(this._isMounted && this.state.games.length > 0){
            return (
                <div id="carousel" className="row">
                        {this.state.games.map((game, index) => {
                            return (
                                <div className="row">
                                    <div className="col-3">

                                    </div>
                                    <div className="col-6">
                                        <div>

                                    <h1 style={{display:"inline-block"}}>{this.rs(game.schedule.awayTeam.id)}</h1> at                                        
                                    <h1 style={{display:"inline-block"}}>{this.rs(game.schedule.homeTeam.id)}</h1> 
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        
                                    </div>

                                </div>
                                // <div key={index} className="">
                                //     <h1>{game.schedule.homeTeam.abbreviation} vs {game.schedule.awayTeam.abbreviation}</h1>
                                // </div>
                            )
                        })}
                </div>
            )
        } else {
            return (
                <div>
                    <h5>Loading</h5>
                </div>
            )
        }
    }
}
const hStyle = {
    color: "white",
}

export default HeaderStats