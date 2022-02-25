import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false

        }
        this.toggleNav = this.toggleNav.bind(this);
    }



    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }

    render() {
        return (
            <div>
                <div className="Jumbotron">
                    <div className="container">
                        <div className="row">
                                <div className="col col-sm-1 minilogo">
                            <Link to="/home" style={{textDecoration: 'none'}}>
                                    <img src='assets/images/minilogo.png' alt="GUC" height="30" width="30" />
                                    </Link>

                                </div>
                                <div className="col col-sm-8">
                                <Link to="/home" style={{textDecoration: 'none'}}>

                                    <h2 style={{ color: 'white', fontWeight: '400' }}>German University in Cairo   /   <small style={{ fontWeight: '100', fontSize: '25px' }}>Post-Grad Office</small> </h2>
                            </Link>
                                </div>
                            <div className='col col-sm-3'>

                            </div>

                        </div>
                    </div>
                </div>
            </div>


        );
    }
}
export default Header;