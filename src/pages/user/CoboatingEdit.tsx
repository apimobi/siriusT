import { useApi } from '../../contexts/ApiProvider';
import { useState, useEffect } from 'react';
import { Stack, Row, Col, Card, Container } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { CoboatingForm } from '../../components/CoboatingForm';
import Body from '../../components/Body';


function CoboatingEdit() {
    const apiContext = useApi();
    let { id } = useParams();
    const [coboatingData, setCoboating] = useState(null);

    console.log(id);

    // const handleNew = () => {
    //     navigate('/coboatings/'+data.id);
    // }

    // let data:Array<object> = [];
    // const [coboatingData, setCoboating] = useState([]);
    // const [items, setItems] = useState([]);
    // const { id } = useParams();
    // const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    // let init = false;

    useEffect(() => {
        apiContext.api.get('coboatings/'+id, '', null).then((response:any) => {
            console.log(response);
            setCoboating(response.body);
        }).catch((error:any) => {
            console.log(error);
        })
    }, [])



    return (
        <Body>
            <Stack gap={3}>
                <Container>
                    <Row>
                        <Col>
                            <Card style={{ width: '30rem' }} key={"card_coboat_new"}>
                                {/* <Card.Img variant="top" src={getImg()}  className='mt-3' /> */}
                                <Card.Body>
                                    {coboatingData? <CoboatingForm data={coboatingData} key="coboating_form" /> : null}
                                </Card.Body>
                            </Card>
                            
                        </Col>
                    </Row>
                </Container>
            </Stack>
        </Body>
    )
}

export default CoboatingEdit;