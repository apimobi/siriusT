import Button from 'react-bootstrap/Button';
import { useApi } from '../contexts/ApiProvider';
import { useState, useEffect } from 'react';
import { Row, Card, Container } from "react-bootstrap";
import Body from '../components/Body';


type Boat = {
    id: string,
    name: string,
    description: string,
    images: { url: string }[]

}

function Boats() {
    const apiContext = useApi();
    const [boatsData, setBoats] = useState<Boat[]>([]);

    useEffect(() => {
        apiContext.api.get('boats', 'page=1&size=50', null).then((response:any) => {
            setBoats(response.body.items);
            console.log(response.body);
        }).catch((error:any) => {
            console.log(error);
        })
    }, [])

    return (
        <Body>
            <Container>
                <Row lg={2}>
                    { boatsData.map((data)=>{
                        return (
                            <Card style={{ width: '18rem' }} key={"boat"+data.id}>
                                {/* <CardImg variant="top" src={data.images[0].url} /> */}
                                <Card.Body>
                                <Card.Title>{data.name}</Card.Title>
                                <Card.Text>
                                {data.description}
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>
                        )
                    })
                    }
                </Row>
            </Container>
        </Body>
    )
}

export default Boats;