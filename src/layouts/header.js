import React, {Component} from 'react'


class Header extends Component {

    render(){

        return(
            <div style={{}} className="">
<nav style={{background:"black"}} className="navbar navbar-expand-lg">
  <div className="container-fluid">
    <a style={{color:"ghostwhite", border: "1px solid red", borderRadius:"20px", padding:"20px", fontSize:"30px", width:"250px"}} className="navbar-brand" href="#">ATB</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Features</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Pricing</a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
           </div>
        )
    }
}

export default Header