import React from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignIn, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Home = (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-6">
                    <Link to="/login">
                        <Card className="button" >
                            <FontAwesomeIcon icon={faSignIn} size="10x" className='icons'></FontAwesomeIcon>
                            <CardBody>
                                <CardTitle className="cardTitle-register"><br></br><br></br><h1>Login In</h1></CardTitle>
                            </CardBody>
                        </Card>
                    </Link>
                </div>
                <div className="col-12 col-md-6">
                    <Link to="/Register">
                        <Card className="button" >

                            <FontAwesomeIcon icon={faUserPlus} size="10x" className='icons'></FontAwesomeIcon>

                            <CardBody>
                                <CardTitle className="cardTitle-register"><br></br><br></br><h1>Sign Up</h1></CardTitle>
                            </CardBody>
                        </Card>
                    </Link>
                </div>
            </div>


        </div>
    );


}
export default Home