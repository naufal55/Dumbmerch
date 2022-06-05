import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ModalDelete from "../Component/ModalDelete.js";
import MainButton from "../Atom/MainButton";
import data from "../Assets/DataDummy.js";
import MainNavbarAdmin from "../Component/MainNavbarAdmin.js";
import { useQuery,useMutation } from "react-query";
import { API } from "../config/api";

const CategoryList = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const title = 'Category';
  document.title = 'DumbMerch | ' + title;
  
  let { data: categories,refetch } = useQuery("categoriesCache", async () => {
    const response = await API.get("/categories");
    return response.data.categories;
  });
  console.log(categories);
  let no = 1;

  const addProduct = () => {
    navigate('/add-categories');
  };
  const handleEdit = (id) => {
    navigate("/edit-category/" + id);
  };
  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

   // Create function for handle delete product here ...
  // If confirm is true, execute delete data
  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/category/${id}`);
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

  return (
    <>
    <MainNavbarAdmin title={title}/>
    <Container>
    <Row>
        
      <Col xs="10">
        <h4 className="text-light my-4">List Category</h4>    
      </Col>
      <Col xs="2" className="text-end">
        <MainButton click={addProduct} color="danger" btn="add"/>
      </Col>
      <Table striped hover variant="dark">
        <thead>
          <tr>
            <th className="col-3">No</th>
            <th className="col-4">Category Name</th>
            <th className="col-5">Action</th>
          </tr>
        </thead>
        <tbody>
          
            {categories?.length !== 0 ? (
              <>
              {categories?.map((item, index) => (

              <tr key={index}>
                <td>{index++}</td>
                <td>{item.name}</td>
                <td>
                  <Row>
                    <Col md={3}>
                      <MainButton click={() => {
                            handleEdit(item.id);
                          }} color="success" type="button" btn="Edit"/>
                    </Col>
                    <Col md={3}>
                      <MainButton click={() => {
                            handleDelete(item.id);
                          }} color="danger" type="button" btn="Delete"/>
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

export default CategoryList;
