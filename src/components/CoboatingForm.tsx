import { useState, useEffect } from 'react';
import { useApi } from '../contexts/ApiProvider';
import Form from 'react-bootstrap/Form';
import InputField from '../components/InputField';
import Button from 'react-bootstrap/Button';
import { useUser } from '../contexts/UserProvider';
import { useNavigate } from 'react-router-dom';



interface CoboatingProps {
    data: CoboatingData
}

interface CoboatingData {
    title: string,
    description: string,
    start_date: string,
    end_date: string,
    interested_by: string,
    boat_id: string,
    user_id: string,
    id:string,
    boat?: { id: string };
}


export const CoboatingInit = {
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    interested_by: '',
    boat_id: '',
    user_id: '',
    id:''
}

function CoboatingForm ({data}:CoboatingProps) {
    const apiContext = useApi();
    const userContext = useUser();
    const [myBoats, setBoats] = useState([{id:'', name: ''}]);
    let navigate = useNavigate();
    let init = CoboatingInit;
    if(data){
        init = data;
    }
    const [coboatData, setForm] = useState<CoboatingData>(init);

    console.log(coboatData);
    
    const options = [
        {value: '', text: '--Choose an option--'},
        {value: 'Crew', text: 'Crew'},
        {value: 'Boat', text: 'Boat'},
      ];

    // const [selected, setSelected] = useState(options[0].value);

    useEffect(() => {
        apiContext.api.get('users/me/boats', 'page=1&size=50', null).then((response:any) => {
            console.log(response);
            setBoats(response.body.items);
        }).catch((error:any) => {
            console.log(error);
        })

    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setForm({
            ...coboatData,
            [event.target.id]: event.target.value,
        });
    };
    
  
    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if(userContext.user){
        coboatData.user_id = userContext.user.id;
      } else{
        coboatData.user_id = '';
      }
      
      if(coboatData.interested_by === 'Boat'){
            coboatData['boat_id'] = '';
      }
      let url = 'coboatings';
      
      if(coboatData.id != ''){
            console.log(coboatData.id );
            url =  'coboatings/';
            apiContext.api.put(url, coboatData.id, coboatData, {}).then((response:any) => {
                console.log(response);
                return navigate('/users/me/coboatings');
            }).catch((error:any) => {
                console.log(error);
            })
      }else{
        apiContext.api.post(url, '', coboatData, {}).then((response:any) => {
            console.log(response);
            return navigate('/users/me/coboatings');
        }).catch((error:any) => {
            console.log(error);
        })
      }
      
    };
  
    return (
      <Form>
        <InputField
            id="title" label="Title"
            type="text"
            placeholder='title'
            onChange={handleChange}
            value={coboatData.title}
            fieldRef={null}
            name={'tilte'}
            error={''}
        />
        <InputField
            id="description" label="Description"
            type="text"
            placeholder='description'
            onChange={handleChange}
            value={coboatData.description}
            fieldRef={null}
            name={'Description'}
            error={''}
        />
        <InputField
            id="start_date" label="Starting date"
            type="date"
            placeholder='Ending date'
            onChange={handleChange}
            value={coboatData.start_date}
            fieldRef={null}
            name={'Starting date'}
            error={''}
        />
        <InputField
            id="end_date" label="Ending date"
            type="date"
            placeholder='end_date'
            onChange={handleChange}
            value={coboatData.end_date}
            fieldRef={null}
            name={'Ending date'}
            error={''}
        />
        <Form.Select aria-label="Interested in" id="interested_by" onChange={handleChange}
         value={coboatData.interested_by}
        >
            
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.text}
                </option>
            ))}

        </Form.Select>

        <Form.Select id="boat_id"  aria-label="Select your boat" onChange={handleChange}
            value={coboatData.boat? coboatData.boat.id:''}
        >
            <option key="selectBoat" >Select your boat</option>
            {myBoats.map((boat) => {
                return (
                    <option value={boat.id} key={"boat"+boat.id}>{boat.name}</option>
                )
            })}

        </Form.Select>

        <Button variant="primary" className="buttonGreen" onClick={handleSubmit}>Save</Button>
      </Form>
    );
  };
  
  export { CoboatingForm };