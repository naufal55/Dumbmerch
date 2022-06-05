import React from "react";
import { Container, Row } from "react-bootstrap";
import BodyPages from "../Component/BodyPages";
import CardFormReg from "../Component/CardFormReg";

const RegisterPages = () => {
  return (
    <Container className="d-grid min-vh-100">
    <Row className="gap-4 justify-content-center align-items-center my-auto bg-none">
        <BodyPages colorLog="danger" colorReg="none"/>
        <CardFormReg btnName="Register" />
      </Row>
    </Container>
  );
};

export default RegisterPages;
