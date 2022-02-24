import React from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignIn, faUserPlus } from '@fortawesome/free-solid-svg-icons'

 const Register = (props) => {
    return (
        <div className="container body">
            <div className="row">
                <div className="col-12 col-md-6">

                    <Card className="button" >
                <FontAwesomeIcon icon={faSignIn} size="10x" className='icons'></FontAwesomeIcon>
                        <CardBody>
                            <CardTitle className="cardTitle-register"><br></br><br></br><h1>Login In</h1></CardTitle>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12 col-md-6">
                    <Card className="button" >
                        
                <FontAwesomeIcon icon={faUserPlus} size="10x" className='icons'></FontAwesomeIcon>
                  
                        <CardBody>
                        <CardTitle className="cardTitle-register"><br></br><br></br><h1>Sign Up</h1></CardTitle>
                        </CardBody>
                    </Card>
                </div>
            </div>
           

        </div>
    );


}
export default Register