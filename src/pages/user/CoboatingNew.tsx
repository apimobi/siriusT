// import Button from 'react-bootstrap/Button';
// import { useApi } from '../../contexts/ApiProvider';
// import { useState, useEffect } from 'react';
import { Row, Col, Card, Container } from "react-bootstrap";
// import { Routes, Route, useParams } from 'react-router-dom';
// import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { CoboatingForm, CoboatingInit } from '../../components/CoboatingForm';
// import { useNavigate } from "react-router-dom";
import Body from '../../components/Body';



function CoboatingNew() {
    // const apiContext = useApi();


    return (
        <Body>
            <Container>
                <Row>
                    <Col md={{ span: 8, offset: 2}}>
                        <h1>Add new coboating</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 8, offset: 2}}>
                            <Card key={"card_coboat_new"}>
                                {/* <Card.Img variant="top" src={getImg()}  className='mt-3' /> */}
                                <Card.Body>
                                    <CoboatingForm data={CoboatingInit}/>
                                </Card.Body>
                            </Card>
                            
                    </Col>
                </Row>
            </Container>
        </Body>
    )
}

export default CoboatingNew;