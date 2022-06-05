import React from "react";
import Logo from "../Assets/Logo.png";
import { Col, Row } from "react-bootstrap";
import MainButton from "../Atom/MainButton";
import { Link, useNavigate } from "react-router-dom";

const BodyPages = (props) => {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/login')
  }

  const handleRegister = () => {
    navigate('/register')
  }

  return (
    <Col md={7}>
      <img src={Logo} className="w-25 mb-3" alt="Logo" />
      <h1 className="text-light mb-3">Easy, Fast and Reliable</h1>
      <p className="text-secondary">
        Go shoping for marchandise, just go to dumb merch shoping. The biggest
        merchandise in <b>Indonesia</b>
      </p>
      <Row className="mt-5">
        <div className="col-md-3 col-6">
          <MainButton
            click={handleLogin}
            btn="Login"
            color={props.colorLog}
            disable={props.disableLog}
          />
        </div>

        <div className="col-md-3 col-6">
          <MainButton
            click={handleRegister}
            btn="Register"
            color={props.colorReg}
            disable={props.disableReg}
            />
        </div>
        
      </Row>
    </Col>
  );
};

export default BodyPages;
