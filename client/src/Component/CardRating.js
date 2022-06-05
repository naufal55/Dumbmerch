import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import CardImage from "./CardImage";
import item from "../Assets/item1.png";
import Rating from "../Atom/Rating";

const CardRating = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.close} centered>
      <form onSubmit={props.onSubmit}>

        <div className="bg-dark text-light">
          <Modal.Header closeButton>
            <Modal.Title>Rate Our Product!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Hi, Thank you for your purchase. We appreciate for you if you will
              comment and rate our product here :
            </p>
            <Row>
              <Col md={6}>
                <CardImage src={props.gambar} />
              </Col>
              <Col md={6}>
                <p className="mb-0">Rate this Product</p>
                <b>Name Product : {props.name}</b>
                <Rating rate={props.rate} size={30} value={props.vRate} edit={true}/>
                <p className="mt-2">Comment</p>
                <textarea className="w-100" rows={5} name="comment" value={props.value} onChange={props.change} id="comment"></textarea>
              </Col>
            </Row>

          </Modal.Body>
          <Modal.Footer>
            <Button className="w-25" type="submit" variant="secondary" onClick={props.submit}>
              Submit
            </Button>
            <Button className="w-25" variant="danger" onClick={props.close}>
              Cancel
            </Button>
          </Modal.Footer>
        </div>
      </form>
      </Modal>
    </>
  );
};

export default CardRating;
