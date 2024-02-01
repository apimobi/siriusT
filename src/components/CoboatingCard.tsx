import { Row, Card, Container} from "react-bootstrap";
import Button from 'react-bootstrap/Button';


export interface Data {
    id: string,
    title: string,
    description: string,
    interested_by: string,
    boat: any,
    end_date: string,
    start_date: string,
    images: any,
}

interface CardProps {
    card: Data,
    edit: boolean
    show: boolean,
    navTo:Function
}

function CoboatingCard({card, edit=false, navTo, show=false}:CardProps) {
    const data = card;
    const truncate = (str:string,n:number) => {
        return (str.length > n) ? str.slice(0, n-1) + '...' : str;
    };

    // const navigate = useNavigate();

    // const navTo = (path:string="") => () => {
    //     if(path == 'show'){
    //         navigate('/coboatings/'+data.id);
    //         return;
    //     }

    //     navigate('/users/me/coboatings/edit/'+data.id);
    // }


    const handleDelete = () => {
        // apiContext.api.delete('coboatings/', coboatData.id, {}).then((response:any) => {
        //     console.log(response);
        //     return navigate('/users/me/coboatings');
        // }).catch((error:any) => {
        //     console.log(error);
        // })
    };

    const getImg = () => {

        if(data.boat && data.boat.images.length > 0){
            return data.boat.images[0].url;
        }

        return "/images/boat_default.jpg";
    }


    return (
        <Container>
            <Row className="justify-content-center mb-3">
                <Card style={{ width: '18rem' }} key={"card_coboat_"+data.id}>
                    <Card.Img variant="top" src={getImg()}  className='mt-3' />
                    <Card.Body>
                        <Card.Title>{data.title}</Card.Title>
                        <Card.Text>
                            {truncate(data.description, 100)}
                        </Card.Text>
                        {show ? <Button variant="primary" className="buttonGreen" onClick={navTo('show', data.id)}>Show</Button> : null}
                        {edit ? <Button variant="primary" className="buttonGreen" onClick={navTo('edit', data.id)}>Edit</Button> : null}
                        {edit? <Button variant="danger" className="buttonGreen" onClick={handleDelete}>Delete</Button> : null}
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    )
}

export default CoboatingCard