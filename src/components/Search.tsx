import { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';

import InputField from './InputField';
import { useApi } from '../contexts/ApiProvider';
import { Stack, Row, Col, Container} from "react-bootstrap";
import { Link  } from "react-router-dom";



export default function Search(): JSX.Element {
  const iniResult ={
    'boats': [],
    'coboatings': [],
  };
  const apiContext = useApi();
  const searchField = useRef<HTMLInputElement>(null);
  const [searchResult, setResult] = useState(iniResult);

  const handleChange = async (event:React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.value.length < 2 || searchField.current == undefined){
      return;
    }
    // event.preventDefault();

    let results = iniResult;

    const search1 = await apiContext.api.get('coboatings/search/', searchField.current.value, null).then((data) => {  
      return data;
    });

    console.log(search1);
    
    if(search1.body.length > 0 ){
      results.coboatings = search1.body;
    }

    const search2 = await apiContext.api.get('boat-models/search/', searchField.current.value,  null).then((data) => {  
      return data;
    });


    if(search2.body.length > 0){
      results.boats = search2.body;
    }

    console.log(results);

    setResult(results);

  }

  const showResults = () => {
    if(searchField == undefined || searchField.current == undefined || searchField.current.value == ''){
        return '';
    }
    return (
        <div className="searchResults ml-5">
            <div>Boats :</div>
            {searchResult.boats.length ==0 ? "No results" : ''}
            
            {searchResult.boats.map((data:{id:string, name:string})=>{
            return <Link to={"boat-models/"+data.id} key={"link_"+data.id}>{data.name}</Link>
            })
            }
            <hr/>
            <div>Coboatings :</div>
            {searchResult.coboatings.length ==0 ? "No results" : ''}
            {searchResult.coboatings.map((data:{id:string, title:string})=>{
            return <Link to={"coboatings/"+data.id} key={"link_"+data.id}>{data.title}</Link>
            })
            }
        </div>
    )
  }

  return (
    <div>
      <Form autoComplete="off">
        <Container>
          <Row>
            <Col>
              <InputField
                id="search"
                label="Search"
                // value={searchField.current != undefined ? searchField.current.value : ''}
                name="search"
                type="text"
                placeholder='search'
                onChange={handleChange}
                fieldRef={searchField}
                error={''}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Stack gap={2}>
                {showResults()}
              </Stack>
            </Col>
          </Row>
          
          
        </Container>
      </Form>
    </div>
  );
}