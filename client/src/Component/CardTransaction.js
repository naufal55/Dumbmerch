import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import CardImage from "./CardImage";
import item from "../Assets/item1.png";
import logo from "../Assets/Logo.png";
import MainButton from "../Atom/MainButton";
import Rating from "../Atom/Rating";

const CardTransaction = (props) => {

  return (
    <div>
      <Card className="bg-dark">
        <Card.Body className="py-2">
          <Row >
            <CardImage src={props.image} />
            <Col md={6} className="col-3" style={{ fontSize: "10px" }}>
              <h5 className="text-danger my-1">{props.namabarang}</h5>
              <p className="text-danger my-1">{props.tglBeli}</p>
              <p className="text-light mb-3">Price : Rp.{props.harga}</p>
              <p className="text-light my-1 fw-bold">Description :<br/> {props.desc}</p>
            </Col>
            <Col className="col-3">
              <CardImage src={logo} />
            </Col>
          </Row>
          <Row className="mt-2 ">
            <Col className="d-flex col-9 text-light align-items-center">
              <Rating value={props.val} rate={props.rate} size={24} edit={false}/>
              <div className="ms-2 mt-1">({props.per}/5)</div>
            </Col>
            <Col className="col-3 ">
              <MainButton click={props.click} color="success" type="button" btn="Rate!"/>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardTransaction;
