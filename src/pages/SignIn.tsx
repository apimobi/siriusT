import { useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Body from '../components/Body';
import InputField from '../components/InputField';
import { useApi } from '../contexts/ApiProvider';

// import { useFlash } from '../contexts/FlashProvider';

export default function SignInPage() {
    const apiContext = useApi();
    const [userData, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        date_of_birth: '',
        bio: '',
    });
    

    const handleChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
      setForm({
        ...userData,
        [event.target.id]: event.target.value,
      });
    };

  
    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      apiContext.api.post('users', '', userData, {}).then((response:any) => {
        console.log(response);
        // alert(coboatData.title + ' ' + coboatData.description+' '+coboatData.start_date);
      })
    };

    return (
        <Body>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <InputField
                    id="first_name" 
                    label="first_name"
                    name="first_name"
                    error={''}
                    fieldRef={null}
                    type="text"
                    placeholder='first_name'
                    onChange={handleChange}
                />
                <InputField
                    id="last_name"
                    label="last_name"
                    name="last_name"
                    error={''}
                    fieldRef={null}
                    type="text"
                    placeholder='last_name'
                    onChange={handleChange}
                />
                <InputField
                    id="email"
                    label="email"
                    name="email"
                    error={''}
                    fieldRef={null}
                    type="email"
                    placeholder='email'
                    onChange={handleChange}
                />
                <InputField
                    id="password"
                    label="password"
                    name="password"
                    error={''}
                    fieldRef={null}
                    type="password"
                    placeholder='password'
                    onChange={handleChange}
                />
                <InputField
                    id="date_of_birth"
                    label="date_of_birth"
                    name="date_of_birth"
                    error={''}
                    fieldRef={null}
                    type="date"
                    placeholder='date_of_birth'
                    onChange={handleChange}
                />
                <InputField
                    id="bio"
                    label="bio"
                    name="bio"
                    error={''}
                    fieldRef={null}
                    type="date"
                    placeholder='bio'
                    onChange={handleChange}
                />
                <Button variant="normal" className="buttonGreen" type="submit">Sign in</Button>
            </Form>
            <hr />
            {/* <p>Don&apos;t have an account? <Link to="/register">Register here</Link>!</p> */}
        </Body>
      );
}