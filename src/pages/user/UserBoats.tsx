import Button from 'react-bootstrap/Button';
import { useApi } from '../../contexts/ApiProvider';
import { useState, useEffect } from 'react';
import { Row, Card, Container, CardImg } from "react-bootstrap";
import Body from '../../components/Body';

type BoatData = {
    id: number;
    name: string;
    description: string;
    images: { url: string }[];
};


function UserBoats() {
    const apiContext = useApi();
    const [boatsData, setBoats] = useState<BoatData[]>([]);


    useEffect(() => {
        apiContext.api.get('users/me/boats', 'page=1&size=50', null).then((response:any) => {
            console.log(response);
            if(response.status == 200) {
                setBoats(response.body.items);
            }
        }).catch((error:any) => {
            console.log(error);
        })
    }, [apiContext])

    return (
        <Body>

            <Container>
                <Row lg={2}>
                    { boatsData.map((data)=>{
                        return (
                                <Card style={{ width: '18rem' }} key={"boat"+data.id}>
                                    {Object.keys(data.images).length > 0 ? <CardImg variant="top" src={data.images[0].url} /> : null }
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

export default UserBoats;