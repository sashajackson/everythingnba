import React, { Component } from 'react'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import moment from 'moment'
import statsPhoto from '../images/xlppvod.png'

class HeaderStats extends Component {
    _isMounted = false;
    _didUpdate = false;
    _time = moment("2021-02-12T00:30:00.000Z").format("h:mm");
    settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

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
            // console.log(this.props.games);
            this.setState({
                games: this.props.games,
                teams: this.props.teams,
            })
            
            // console.log('headerStat component updated');
        }
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    componentDidUpdate = () => {
        // console.log('headerStats component updated');
        this._didUpdate = true;
        // console.log(this._time);
        // console.log(this.state.teams);
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
        // console.log(team);
        return team[0].team.officialLogoImageSrc;
    }

    getTeamId = (id) => {
        let team = this.state.teams.filter(identify => {
            return identify.team.id === id;
        })
        // console.log(team);
        return team;
    }

    getTeamInfo = (homeTeamId, awayTeamId) => {
        let homeTeam = this.state.teams.filter(identify => {
            return identify.team.id === homeTeamId;
        });

        let awayTeam = this.state.teams.filter(identify => {
            return identify.team.id === awayTeamId;
        });

        if(homeTeam[0].overallRank.rank < awayTeam[0].overallRank.rank){
            return homeTeam;
        } else {
            return awayTeam;
        }
    }

    render(){
        if(this._isMounted && this.state.games.length > 0){
            return (
                <div id="carousel" className="row">
                    <Slider {...this.settings}>
                        {this.state.games.map((game, index) => {
                            return (
                                
                                <div key={index} className="col-12">
                                    <div className="row">

                                    <div className="col-4">
                                    <div className="alert" style={{borderRadius:"0", background:"black", color:"gold", marginBottom:"0", textAlign:"center"}}>
                                        {moment(game.schedule.startTime).format("h:mm")} PM
                                    </div>
                                    </div>

                                    <div className="col-4 ">
                                        <div className="" style={{color:"ghostwhite"}}>
                                        <div className="alert" style={{borderRadius:"0", background:"black", color:"white", marginBottom:"0", textAlign:"center"}}>
                                            {this.getTeamInfo(game.schedule.homeTeam.id, game.schedule.awayTeam.id)[0].team.name} <i style={{color:"gold"}} class="fas fa-dice"></i>
                                        </div>
                                        
                                        </div>
                                    </div>
                                            
                                    
                                    <div className="col-4 " style={{}}>
                                            <div style={{borderRadius:"0", background:"black", color:"lime", marginBottom:"0", textAlign:"center"}} className="alert">
                                                is ranked #{this.getTeamInfo(game.schedule.homeTeam.id, game.schedule.awayTeam.id)[0].overallRank.rank} overall
                                            </div>

                                    </div>

                                    
                                </div>
                                            

                                            
                                       

                                        

                                    <div className="row">
                                    <div style={{paddingRight:"0"}} className="col-6">
                                        <div style={colStyle}>
                                            <img src={this.rs(game.schedule.awayTeam.id)} style={gameStyle} />                                         
                                            {/* <img src={this.rs(game.schedule.homeTeam.id)} style={gameStyle1} />   */}
                                        </div>
                                    </div>
                                    <div style={{paddingLeft:"0"}} className="col-6">
                                        <div style={colStyle1}>
                                            {/* <img src={this.rs(game.schedule.awayTeam.id)} style={gameStyle} />                                          */}
                                            <img src={this.rs(game.schedule.homeTeam.id)} style={gameStyle1} />  
                                        </div>
                                    </div>

                                    </div>
                                </div>
                                )
                            })}
                            </Slider>
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
const gameStyle = {
    display:"inline-block",
    width:"70px",
    height: "auto",
}
const gameStyle1 = {
    display:"inline-block",
    width:"70px",
    height: "auto",
    textAlign: "right",
}
const colStyle = {
    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset',
    padding: "20px",
    background: "white",
}
const colStyle1 = {
    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset',
    padding: "20px",
    background: "white",
    textAlign:"right",
}
const oddsPicStyle = {
    height:"50px",
    width:"auto",
    padding:"10px",
}

export default HeaderStats