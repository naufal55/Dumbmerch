import { useContext, useState, useEffect } from "react";
import { useHistory, useNavigate } from "react-router-dom";

import { Col, Container, Row } from "react-bootstrap";
import CardProduct from "../Component/CardProduct";
import data from "../Assets/DataDummy.js";
import MainNavbar from "../Component/MainNavbar";
import { UserContext } from "../context/userContext";

import { useQuery } from "react-query";
import { API } from "../config/api";
const HomePages = () => {
  const navigate = useNavigate();
  const title = "Homepage";
  document.title = "DumbMerch | " + title;

  let { data: products } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    return response.data.products;
  });

  // const breakpointColumnsObj = {
  //   default: 6,
  //   1100: 4,
  //   700: 3,
  //   500: 2,
  // };

  return (
    <>
      <MainNavbar title={title} />
      <div>
        <Container className="mt-3">
          <Row>
            <h4 className="text-danger my-4">Product</h4>
          </Row>
          <div className="row my-4">

            {products?.length !== 0 ? (
              <div className="d-flex gap-2">
                {products?.map((item,index) => (
                  <Col key={index} md={2}>
                    <CardProduct
                      id={item.id}
                      title={item.title}
                      price={item.price}
                      qty={item.qty}
                      image={item.image}
                    />
                  </Col>
                ))}
              </div>
            ) : (
              <p className="text-danger">data empty</p>
            )}
            
          </div>
        </Container>
      </div>
    </>
  );
};

export default HomePages;
