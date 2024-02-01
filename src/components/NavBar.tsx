import { Navbar, Container, Nav } from "react-bootstrap";
import { Link  } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useUser } from '../contexts/UserProvider';
import { LinkContainer } from 'react-router-bootstrap'


function NavBar(){

    const userContext = useUser();

    const navDropdownTitle = (<i className="ri-account-circle-fill ri-2x"></i>);

    const getNavUser = () => {
      if(userContext.user){
        return (
          <>
            <LinkContainer to="users/me">
              <NavDropdown.Item>My profile</NavDropdown.Item>
            </LinkContainer>

            <LinkContainer to="users/me/boats">
              <NavDropdown.Item>My boats</NavDropdown.Item>
            </LinkContainer>
            
            <LinkContainer to="users/me/boats/new">
              <NavDropdown.Item>New boat</NavDropdown.Item>
            </LinkContainer>

            <LinkContainer to="users/me/coboatings">
              <NavDropdown.Item>My coboatings</NavDropdown.Item>
            </LinkContainer>
          
            <LinkContainer to="users/me/coboatings/new">
              <NavDropdown.Item>New coboatings</NavDropdown.Item>
            </LinkContainer>
          </>
        )
      }

      return (
        <>
          <Link to="signin">Sign in</Link><br/>
          <NavDropdown.Item href="#action/3.2"><Link to="/login">login</Link></NavDropdown.Item>
        </>
      )
    }

    return (
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" >
        <Container>
          <LinkContainer to="/">
                  <Navbar.Brand>< i className="ri-anchor-fill"></i></Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" activeKey="">
              

              <LinkContainer to="/coboatings">
                <Nav.Link>Coboatings</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/boats">
                <Nav.Link>Boats</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/homeports">
                <Nav.Link>Homeports</Nav.Link>
              </LinkContainer>
            </Nav>

            <Nav>
              <NavDropdown title={navDropdownTitle} id="collapsible-nav-dropdown">
                {getNavUser()}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      );
    }

export default NavBar