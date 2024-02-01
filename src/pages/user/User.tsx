// {
//     "id": "78d649c2-53c5-4c95-a372-5c4cef20ee28",
//     "first_name": "bart",
//     "last_name": "simpson",
//     "email": "vinux04@gmail.com",
//     "date_of_birth": "01/01/2000",
//     "is_active": true
//   }
// import Card from 'react-bootstrap/Card';
import { useUser } from '../../contexts/UserProvider';
import { Row, Col, Card, Container } from "react-bootstrap";
import Body from '../../components/Body';

function User(){
    const userContext = useUser();
    const user = userContext.user;

    console.log(user);

    return (
        <Body>
            <Container>
                <Row>
                    <Col md={{ span: 8, offset: 2}}>
                        <h1>Me</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 8, offset: 2}}>
                        <Card>
                            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                            <Card.Body>
                                <Card.Title>AAAAAA</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                                </Card.Text>
                            </Card.Body>
                            <Card.Body>
                                <Card.Link href="#">Card Link</Card.Link>
                                <Card.Link href="#">Another Link</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Body>

        
    )
}

export default User;