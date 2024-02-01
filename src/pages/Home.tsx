import { Row, Col, Container} from "react-bootstrap";
import { CoboatingList } from '../components/CoboatingList';
import Search from '../components/Search';
import Body from '../components/Body';

function Home() {

    return (
        <Body>
            <Container>
                <Row className="searchBar">
                    <Col>
                        <div className='searchText'>
                            Find your dream
                        </div>
                        
                    </Col>
                </Row>
                <Row>
                    <Col ></Col>
                    <Col xs={6}>
                        <Search/>
                    </Col>
                    <Col></Col>
                </Row>
                
                <Row className='mt-5'></Row>
                <Row className='mt-5'></Row>
                <Row className='mt-5'></Row>
                <CoboatingList url={"coboatings"} query={"page=1&size=3"} />
            </Container>
        </Body>
    )
}

export default Home;