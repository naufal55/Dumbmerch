import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

import MainNavbarAdmin from "../Component/MainNavbarAdmin";
import InputColumn from "../Atom/InputColumn";
import MainButton from "../Atom/MainButton";
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';

import { API } from '../config/api';

const EditProduct = () => {
  const title = "Update Product";
  document.title = "DumbMerch | " + title;

  let navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({}); //Store product data
  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    image: "",
    title: "",
    desc: "",
    price: "",
    qty: "",
  }); //Store product data
  
  // Fetching detail product data by id from database
  let { data: products, refetch } = useQuery('productCache', async () => {
    const response = await API.get('/product/' + id);
    return response.data.data;
  });

  useEffect(() => {
    if (products) {
      setPreview(products.image);
      setForm({
        ...form,
        title: products.title,
        desc: products.desc,
        price: products.price,
        qty: products.qty,
      });
      setProduct(products);
    }

  }, [products]);

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: { 
          'Content-type': 'multipart/form-data',
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
      }
      
      formData.set("title", form.title);
      formData.set("desc", form.desc);
      formData.set("price", form.price);
      formData.set("qty", form.qty);

      // Insert product data
      const response = await API.patch(
        '/product/' + product.id,
        formData,
        config
      );
      console.log(response.data);

      navigate("/product-list");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <MainNavbarAdmin title={title} />
      <Container>
        <h4 className="text-light my-4">Update Product</h4>

        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="text-white my-5">
            {preview && (
              <div>
                <img
                  src={preview}
                  style={{
                    maxWidth: "150px",
                    maxHeight: "150px",
                    objectFit: "cover",
                  }}
                  alt={preview}
                />
              </div>
            )}
            <label for="upload" className="fw-2">
              Upload file
            </label>
            <input
              type="file"
              id="upload"
              name="image"
              hidden
              onChange={handleChange}
            />
            <InputColumn
              type="text"
              holder="Product Name"
              change={handleChange}
              name="title"
              value={form?.title}
            />
            <InputColumn
              holder="Product Description"
              change={handleChange}
              name="desc"
              as="textarea"
              rows={3}
              value={form?.desc}
            />
            <InputColumn
              type="number"
              holder="Price (Rp.)"
              change={handleChange}
              name="price"
              value={form?.price}
            />
            <InputColumn
              type="number"
              holder="Stock"
              change={handleChange}
              name="qty"
              value={form?.qty}
            />

          </div>
          <MainButton type="submit" color="success" btn="Save" />
        </form>
      </Container>
    </>
  );
};

export default EditProduct;
