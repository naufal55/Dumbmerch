import React, {useContext} from 'react'
import { Container, Nav, Navbar} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Logo from "../Assets/Logo.png";
import NavLink from "../Atom/NavLink";
import { UserContext } from '../context/userContext'
const MainNavbar = (props) => {
  // const {isAdmin, setIsLogin} = useState(true)
  const [state, dispatch] = useContext(UserContext)

  const navigate = useNavigate()

    const handleLogout = () => {
      
        console.log(state)
        dispatch({
            type: "LOGOUT"
        })
        navigate("/login")
    }

  const isAdmin = props.admin
  

  return (
    <Navbar bg="none" expand="lg" className="align-items-center navbar-dark">
      <Container>
        <Navbar.Brand onClick={()=>navigate('/homepage')}><img src={Logo} width={50} alt="logo"/></Navbar.Brand>
        <Navbar.Toggle className="text-light" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className=" me-auto justify-content-end" id="basic-navbar-nav">
          <Nav className="fw-bold">
          <NavLink label="Complain" color={props?.title === 'Complain' ? `text-danger` : `text-light`} click={()=>navigate('/complain')}/>
          <NavLink label="Profile" color={props?.title ==='Profile' ? `text-danger` : `text-light`} click={()=>{navigate('/profile')}}/> 
          <NavLink label="Logout" color="text-light"  click={handleLogout}/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
