import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ModalDelete from "../Component/ModalDelete";
import MainButton from "../Atom/MainButton";
import convertRupiah from 'rupiah-format';


import MainNavbarAdmin from "../Component/MainNavbarAdmin.js";

import { useQuery,useMutation } from "react-query";
import { API } from "../config/api";

const ProductList = () => {

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const title = "Product";
  document.title = "DumbMerch | " + title;

  let { data: products, refetch } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    return response.data.products;
  });
  console.log(products);

  const addProduct = () => {
    navigate("/add-product");
  };

  const handleEdit = (id) => {
    navigate("/edit-product/" + id);
  };

  // Create function handle get id product & show modal confirm delete data here ...
  // For get id product & show modal confirm delete data
  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  // Create function for handle delete product here ...
  // If confirm is true, execute delete data
  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/product/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });
  // Call function for handle close modal and execute delete data with useEffect here ...
  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose();
      // execute delete data by id function
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  let no = 1;

  return (
    <>
      <MainNavbarAdmin title={title} />
      <Container>
        <Row>
          <Col xs="10">
            <h4 className="text-light my-4">List Product</h4>
          </Col>
          <Col xs="2" className="text-end">
            <MainButton click={addProduct} color="danger" btn="add" />
          </Col>
          <Table striped hover variant="dark">
            <thead>
              <tr>
                <th>No</th>
                <th>Photo</th>
                <th>Product Name</th>
                <th>Product Desc</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {products?.length !== 0 ? (
              <>
              {products?.map((item, index) => (

                <tr key={index}>
                  <td>{no++}</td>
                  <td>
                    <img
                      src={item.image}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                      alt={item.title}
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.desc.slice(0, 15)}...</td>
                  <td>{convertRupiah.convert(item.price)}</td>
                  <td>{item.qty}</td>
                  <td>
                    <Row>
                      <Col md={6}>
                        <MainButton
                          click={() => {
                            handleEdit(item.id);
                          }}
                          color="success"
                          type="button"
                          btn="Edit"
                        />
                      </Col>
                      <Col md={6}>
                        <MainButton
                          click={() => {
                            handleDelete(item.id);
                          }}
                          color="danger"
                          type="button"
                          btn="Delete"
                        />
                      </Col>
                    </Row>
                  </td>
                </tr>
               
              ))}

              </>
            ) : (
              <p className="text-danger">data empty</p>
            )}
            </tbody>
          </Table>
          <ModalDelete setConfirmDelete={setConfirmDelete} show={show} close={handleClose} />
        </Row>
      </Container>
    </>
  );
};

export default ProductList;
