import { useApi } from '../../contexts/ApiProvider';
import { useState, useRef } from 'react';
import { Row, Col, Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import Button from 'react-bootstrap/Button';
import Body from '../../components/Body';
import InputField from '../../components/InputField';



function BoatsNew() {
    const apiContext = useApi();
    const descriptionField = useRef();
    const constructionField = useRef();
    const [state, setState] = useState(false);
    const [options, setOptions] = useState([{label: 'test'}]);

    const onSubmit = async  (ev:React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        console.log('handle form here');

        const data = {
            "description": "string",
            "construction": "Fiberglass",
            "hull_type": "Fin w/bulb & spade rudder",
            "rigging_type": "Sloop",
            "loa": 2,
            "lwl": 2,
            "sa": 2,
            "beam": 1.1,
            "displacement": 1,
            "draft": 1.1,
            "first_built": 1950,
            "designer": "string",
            "engine_brand": "Yanmar",
            "hp": 100,
            "fuel_type": "Diesel",
            "fuel_capacity": 100,
            "water_capacity": 100,
            "name": "string",
            "location": "string",
            "year": 1950
          }


        await apiContext.api.post('boats', '', data, {}).then((response:any) => {
            console.log(response);
            console.log(response.body);
        }).catch((error:any) => {
            console.log(error);
        })
    };

    const handleChange = async (query:string) => {
        console.log(query);
        // if(event.target.value.length < 2){
        //   return;
        // }
        // event.preventDefault();

        setOptions([{label: 'test'}]);
    
        setState(true);
        await apiContext.api.get('boat-models/search/', query, null);

        setState(false);
    
    }
    
    return (
        <Body>
            <Container>
                <Row>
                    <Col md={{ span: 8, offset: 2}}>
                        <h1>Add new boat</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 8, offset: 2}}>
                        <Form onSubmit={onSubmit}>
                            <InputField
                                id="description"
                                name="description"
                                label="description"
                                error={''}
                                fieldRef={descriptionField}
                                type="text"
                                placeholder='description'
                                onChange={null}
                            />
                            <InputField
                                id="construction"
                                label="construction"
                                name="construction"
                                error={''}
                                fieldRef={constructionField}
                                type="text"
                                placeholder='construction'
                                onChange={null}
                            />
                            <AsyncTypeahead
                                id="async-example"
                                isLoading={state}
                                // labelKey={(option => `${option.label}`}
                                onSearch={(query)=>{
                                    handleChange(query);
                                }}
                                options={options}
                            />
                            <Button variant="normal" className="buttonGreen" type="submit">Login</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Body>

    )
}

export default BoatsNew;