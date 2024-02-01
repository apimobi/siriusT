import { useApi } from '../contexts/ApiProvider';
import { useState, useEffect } from 'react';
import { Row, Col } from "react-bootstrap";
import { useParams } from 'react-router-dom';
// import Body from '../components/Body';
import CoboatingCard from '../components/CoboatingCard';
import { Data } from '../components/CoboatingCard';
import { useNavigate } from "react-router-dom";


interface ListProps {
    url:string,
    query:string
}

export function CoboatingList({url, query=''}:ListProps) {
    const apiContext = useApi();
    // let data:Array<Data> = [];
    const [items, setItems] = useState<Data[]>([]);
    const { id } = useParams();
    let init = false;

    console.log(url);


    const navigate = useNavigate();

    const navTo = (path:string="", id:string='') => () => {
        if(path == 'show'){
            navigate('/coboatings/'+id);
            return;
        }

        navigate('/users/me/coboatings/edit/'+id);
    }

    useEffect(() => {
        if(init == true){
            return;
        }
        console.log('i fire o');
        init = true;

        // let url = 'coboatings';
        // if(id) url += '/'+id;

        console.log(url);
        console.log(query);
        
        apiContext.api.get(url, query, null).then((response:any) => {
            console.log(response.body);
            if(id) {
                const responseData = response.body;
                setItems([responseData]);
            }else{
                const responseData = response.body;
                setItems(responseData.items);
            } 

        }).catch((error:any) => {
            console.log(error);
        })


    }, [apiContext, navigate])


    const display = () => {

        if(id){
            return (
                <Row lg={3} md={3} xs={1} >
                    <Col> 
                        <CoboatingCard card={items[0]} show={true} edit={false} key={"CoboatingCard_"} navTo={navTo}/>
                    </Col>
                </Row>
            )
        }else{
            return (
                <Row lg={3} md={3} xs={1} >
                    { items?.map((cardData, index)=>{
                        console.log(cardData);
                        return <CoboatingCard card={cardData} show={true} edit={false} key={"CoboatingCard_"+index} navTo={navTo}/>
                        })
                    }
                </Row>
            )
        }
    }

    return (
        <>
            {items?  display() : ""}
        </>
    )
}
