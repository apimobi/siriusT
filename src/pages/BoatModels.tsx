import { useApi } from '../contexts/ApiProvider';
import { useState, useEffect } from 'react';
import { Row, Card, Container } from "react-bootstrap";
import Body from '../components/Body';
import { useParams } from 'react-router-dom';

type BoatModel = {
    id: string,
    name: string,
    description: string,
    images: { url: string }[]

}

function BoatModels() {
    const apiContext = useApi();
    const [boatsData, setData] = useState<BoatModel>({ id: '', name: '', description: '', images: [] });
    const { id } = useParams();

    useEffect(() => {
        apiContext.api.get('boat-models/'+id, '', null).then((response:any) => {
            setData(response.body);
        }).catch((error:any) => {
            console.log(error);
        })
    }, [])

    return (
        <Body>
            <Container>
                <Row lg={2}>
                    <Card key="boat_model">
                        {/* <CardImg variant="top" src={boatsData.images[0].url} /> */}
                        <Card.Body>
                        <Card.Title>{boatsData.name}</Card.Title>
                        <Card.Text>
                            {boatsData.description}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </Body>
    )
}

export default BoatModels;