import { Stack, Container } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import Body from '../components/Body';
import { CoboatingList } from '../components/CoboatingList';


export function Coboating() {
    const { id } = useParams();

    const display = () => {

        if(id){
            return (
                <CoboatingList url={"coboatings/"+id} query={""} />
            )
        }else{
            return (
                <CoboatingList url={"coboatings"} query={""} />
            )
        }
    }

    return (
        <Body>
            <Stack gap={3}>
                <Container>
                    {display()}
                </Container>
            </Stack>
        </Body>
    )
}
