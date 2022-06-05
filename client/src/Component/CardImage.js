import React from "react";
import { Card, Col } from "react-bootstrap";

const CardImage = (props) => {
  return (
    <Col md={props.md} sm={props.sm} >
      <Card className="bg-dark mx-auto ">
        <Card.Img variant="top" className={props.width} src={props.src} />
      </Card>
    </Col>
  );
};

export default CardImage;
