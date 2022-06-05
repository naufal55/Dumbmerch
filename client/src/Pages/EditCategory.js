import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

import MainNavbarAdmin from "../Component/MainNavbarAdmin";
import InputColumn from "../Atom/InputColumn";
import MainButton from "../Atom/MainButton";
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';

import { API } from '../config/api';

const EditCategory = () => {
  const title = "Update Category";
  document.title = "DumbMerch | " + title;

  let navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState({ name: '' });
  
  useQuery('categoryCache', async () => {
    const response = await API.get('/category/' + id);
    setCategory({ name: response.data.categories.name });
  });

  // Handle change data on form
  const handleChange = (e) => {
    setCategory({
      ...category,
      name: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const body = JSON.stringify(category);

      const response = await API.patch('/category/' + id, body, config);

      navigate('/category-list');
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <MainNavbarAdmin title={title} />
      <Container>
        <h4 className="text-light my-4">Update Category</h4>

        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="text-white my-5">
            
            <InputColumn
              type="text"
              holder="Category Name"
              change={handleChange}
              value={category.name}
            />
           

          </div>
          <MainButton type="submit" color="success" btn="Save" />
        </form>
      </Container>
    </>
  );
};

export default EditCategory;
