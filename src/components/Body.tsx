import Container from 'react-bootstrap/Container';
// import FlashMessage from './FlashMessage';
import {useLocation} from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import Sidebar from './Sidebar';


type Props = {
    sidebar?: boolean
    children?: JSX.Element | JSX.Element[]
  }



const  Body = ({sidebar, children}:Props) => {

  const location = useLocation();
  if(location.pathname === '/' || location.pathname === '/home'){
    document?.getElementById('root')?.classList.add("bgBody");
    document?.getElementById('root')?.classList.remove("bgBody1");
  }else{
    document?.getElementById('root')?.classList.add("bgBody1");
    document?.getElementById('root')?.classList.remove("bgBody");
  }
  
  return (
    <Container>
      <Stack direction="horizontal" className="Body">
        {sidebar && <Sidebar />}
        <Container className="Content">
          {/* <FlashMessage />   */}
          {children}
        </Container>
      </Stack>
    </Container>
  );
}

export default Body;