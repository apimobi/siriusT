import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Body from '../components/Body';
import InputField from '../components/InputField';
import { useUser } from '../contexts/UserProvider';
// import { useFlash } from '../contexts/FlashProvider';

type Error = {
    username?: string,
    password?: string,
}

export default function LoginPage() {
    const [formErrors, setFormErrors] = useState<Error>({});
    const usernameField = useRef<HTMLInputElement>(null);
    const passwordField = useRef<HTMLInputElement>(null);
    const { login } = useUser();
    // const flash = useFlash();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // usernameField.current.focus();
      }, []);

    const onSubmit = async  (ev:React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        console.log('handle form here');
        if(usernameField.current == undefined || passwordField.current == undefined){
            return;
        }
        const username = usernameField.current.value;
        const password = passwordField.current.value;

        const errors:Error = {};
        if (!username) {
            errors.username = 'Username must not be empty.';
        }
        if (!password) {
            errors.password = 'Password must not be empty.';
        }
        setFormErrors(errors);
        if (Object.keys(errors).length > 0) {
            return;
        }

        const result = await login(username, password);
        if (result === 'fail') {
            // flash('Invalid username or password', 'danger');
        }
        else if (result === 'ok') {
            let next = '/';
            if (location.state && location.state.next) {
            next = location.state.next;
            }
            navigate(next);
        }
    };

    return (
        <Body>
            <h1>Login</h1>
            <Form onSubmit={onSubmit}>
                <InputField
                    id="username"
                    name="username"
                    label="username"
                    error={formErrors.username != undefined ? formErrors.username : ''}
                    fieldRef={usernameField}
                    type="text"
                    placeholder='Username'
                    onChange={null}
                    // value={usernameField.current != undefined ? usernameField.current.value : ''}
                />
                <InputField
                    id="password"
                    name="password" label="Password"
                    error={formErrors.password != undefined ? formErrors.password : ''}
                    fieldRef={passwordField}
                    type="password"
                    placeholder='Password'
                    onChange={null}
                    // value={passwordField.current != undefined ? passwordField.current.value : ''}
                />
                <Button variant="normal" className="buttonGreen" type="submit">Login</Button>
            </Form>
            <hr />
            {/* <p>Don&apos;t have an account? <Link to="/register">Register here</Link>!</p> */}
        </Body>
      );
}