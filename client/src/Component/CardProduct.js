import React from "react";
import { Card, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
// import item from "../Assets/item1.png";

const CardProduct = (props) => {
  return (
    <Link to={`/detail-page/` + props.id} style={{ textDecoration: "none" }}>
    
      <Card className="bg-dark my-3" >
        <Card.Img variant="top" src={props.image} alt={props.title}/>
        <Card.Body className="text-white py-1">
          <h5 className="text-danger my-2">{props.title}</h5>
          <p className="my-1">{props.price}</p>
          <p className="my-1">Stok : {props.qty}</p>
        </Card.Body>
      </Card>
    
    </Link>
  );
};

export default CardProduct;
