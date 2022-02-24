import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faSignIn,faUserPlus } from '@fortawesome/free-solid-svg-icons'
 const Register = (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-6">

                    <Card className="button" >
                <FontAwesomeIcon icon={faSignIn} size="10x"></FontAwesomeIcon>
                        <CardBody>
                            <CardTitle>Hablozlo</CardTitle>
                            <CardText>KakaMe3eze</CardText>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12 col-md-6">
                    <Card className="button" >
                        
                <FontAwesomeIcon icon={faUserPlus} size="10x"></FontAwesomeIcon>
                  
                        <CardBody>
                            <CardTitle>Hablozlo</CardTitle>
                            <CardText>KakaMe3eze</CardText>
                        </CardBody>
                    </Card>
                </div>
            </div>
           

        </div>
    );


}
export default Register