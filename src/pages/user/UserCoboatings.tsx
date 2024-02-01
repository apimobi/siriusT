import Body from '../../components/Body';
import { CoboatingList } from '../../components/CoboatingList';
import { Stack, Container } from "react-bootstrap";



function UserCoboatings() {

    return (
        <Body>
            <Stack>
                <Container>
                    <CoboatingList url={"users/me/coboatings"} query={"page=1&size=10"} />
                </Container>
            </Stack>
        </Body>
    )
}

export default UserCoboatings;