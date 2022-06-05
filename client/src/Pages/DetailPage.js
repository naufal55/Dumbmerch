import React from "react";
import {Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import convertRupiah from 'rupiah-format';
import MainButton from "../Atom/MainButton";
import CardImage from "../Component/CardImage";
import MainNavbar from "../Component/MainNavbar";

import { useQuery } from "react-query";
import { API } from "../config/api";

const DetailPage = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  
  let { data: product } = useQuery('productCache', async () => {
    const response = await API.get('/product/' + id);
    return response.data.products;
  });
  return (
    <>
      <MainNavbar/>
      <Container className="d-grid mt-3">

        <Row className="gap-4 justify-content-center align-items-center my-auto bg-none">
          <CardImage sm="12" md="4" src={product?.image} />
          <Col md={7} sm={12} className="text-light">
            <h1 className="text-light mb-3">{product?.title}</h1>
            <p>Stock : {product?.qty}</p>
            <p style={{ textAlign: "justify" }}>{product?.desc}</p>
            <h4 className="text-danger fw-bold text-end mb-4">
              Rp.{convertRupiah.convert(product?.price)}
            </h4>
            <MainButton type="button" btn="Buy" click={()=>navigate('/profile')} color="danger" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DetailPage;
