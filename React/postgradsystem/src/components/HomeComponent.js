import React from 'react'
import { Card, CardBody, CardTitle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignIn, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import Header from './HeaderComponent';


const Home = (props) => {
    return (
        <>
            <Header></Header>
            <div className="container ">

                <div className="row m-5">
                    <div className="col-12 col-md-6">
                        <Link to="/login" className='link-underline'>
                            <Card className="button" style={{ background: '	#007EFC' }} >
                                <FontAwesomeIcon icon={faSignIn} size="10x" className='icons'></FontAwesomeIcon>

                                <CardBody>
                                    <CardTitle className="cardTitle-register"><br></br><br></br><h1 style={{ color: 'white', textAlign:'center' }}>Log In</h1></CardTitle>
                                </CardBody>
                            </Card>
                        </Link>
                    </div>
                    <div className="col-12 col-md-6">

                        <Link to="/register" className='link-underline'>
                            <Card className="button" style={{ background: '	#007EFC' }} >
                                <FontAwesomeIcon icon={faUserPlus} size="10x" className='icons'></FontAwesomeIcon>

                                <CardBody>
                                    <CardTitle className="cardTitle-register"><br></br><br></br><h1 style={{ color: 'white', textAlign:'center' }}>Sign Up</h1></CardTitle>
                                </CardBody>
                            </Card>
                        </Link>
                    </div>
                </div>



            </div>
        </>
    );


}
export default Home