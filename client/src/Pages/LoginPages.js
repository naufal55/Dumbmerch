import { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/userContext";
import BodyPages from "../Component/BodyPages";
import CardFormLog from "../Component/CardFormLog";

const LoginPages = (props) => {
  const navigate = useNavigate();
  const [stateLog] = useContext(UserContext);

  
  useEffect(() => {
   
      const checkAuth = () => {
        if (stateLog.isLogin === true) {
          navigate("/");
        }
      };
      checkAuth();
    
  });

  return (
    <Container className="d-grid vh-100">
      <Row className="gap-4 justify-content-center align-items-center my-auto bg-none">
        <BodyPages colorLog="danger" colorReg="none" />
        <CardFormLog btnName="Login" />
      </Row>
    </Container>
  );
};

export default LoginPages;
