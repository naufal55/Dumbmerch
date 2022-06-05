import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import MainNavbarAdmin from "../Component/MainNavbarAdmin";
import InputColumn from "../Atom/InputColumn";
import MainButton from "../Atom/MainButton";
import { useNavigate } from "react-router";
import { useMutation } from "react-query";

import { API } from '../config/api';

const AddCategoriesAdmin = () => {
  const title = "Add Categories";
  document.title = "DumbMerch | " + title;

  let navigate = useNavigate();

  const [category, setCategory] = useState('');

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Data body
      const body = JSON.stringify({ name: category });

      // Insert category data
      const response = await API.post('/category', body, config);

      navigate('/category-list');
    } catch (error) {
      console.log(error);
    }
  });


  return (
    <>
      <MainNavbarAdmin title={title} />
      <Container>
        <h4 className="text-light my-4">Add Categories</h4>

        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="text-white my-5">
            
            <InputColumn
              type="text"
              holder="Category Name"
              change={handleChange}
              name="name"
              value={category}
            />
           

          </div>
          <MainButton type="submit" color="success" btn="Save" />
        </form>
      </Container>
    </>
  );
};

export default AddCategoriesAdmin;
