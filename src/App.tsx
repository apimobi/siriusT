// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ApiProvider from "./contexts/ApiProvider";
import { Container} from "react-bootstrap";

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Coboating} from "./pages/Coboating";
import User from "./pages/user/User";
import UserBoats from "./pages/user/UserBoats";
import BoatsNew from "./pages/user/BoatsNew";
import CoboatingNew from "./pages/user/CoboatingNew";
import UserProvider from './contexts/UserProvider';
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import UserCoboatings from "./pages/user/UserCoboatings";
import SignInPage from "./pages/SignIn";
import CoboatingEdit from "./pages/user/CoboatingEdit";
import BoatsModel from "./pages/BoatModels";
import NavBar from "./components/NavBar";
import Boats from "./pages/Boats";


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
          <ApiProvider>
            <UserProvider>
              <Container>
                  <NavBar />
                  
                  <Routes>
                    <Route element={<PublicRoute />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/signin" element={<SignInPage />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/boats" element={<Boats />} />
                        <Route path="/coboatings" element={<Coboating />} />
                        <Route path="/coboatings/:id" element={<Coboating />} />
                        <Route path="/boat-models" element={<BoatsModel/>} />
                        <Route path="/boat-models/:id" element={<BoatsModel/>} />
                    </Route>
                    <Route element={<PrivateRoute />}>
                        <Route path="/users/me/coboatings" element={<UserCoboatings />}/>
                        <Route path="/users/me/coboatings/new" element={<CoboatingNew />}/>
                        <Route path="/users/me/coboatings/edit/:id" element={<CoboatingEdit />}/>
                        <Route path="/users/me/boats" element={<UserBoats />}/>
                        <Route path="/users/me/boats/new" element={<BoatsNew />}/>
                        <Route path="/users/me/boats/edit/:id" element={<BoatsNew />}/>
                        <Route path="/users/me" element={<User />} />
                    </Route>
                  </Routes>
              </Container>
            </UserProvider>
        </ApiProvider>
      </BrowserRouter>
    </>
  )
}

export default App
