import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import MainNavbarAdmin from "../Component/MainNavbarAdmin";
import InputColumn from "../Atom/InputColumn";
import MainButton from "../Atom/MainButton";
import { useNavigate } from "react-router";
import { useMutation } from "react-query";

import { API } from '../config/api';

const AddProductAdmin = () => {
  const title = "Add Product";
  document.title = "DumbMerch | " + title;

  let navigate = useNavigate();

  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    image: "",
    title: "",
    desc: "",
    price: "",
    qty: "",
  }); //Store product data
  
  // const [categories, setCategories] = useState([]); //Store all category data
  // const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  
  // Fetching category data
  // const getCategories = async () => {
  //   try {
  //     const response = await API.get("/categories");
  //     setCategories(response.data.categories);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // // For handle if category selected
  // const handleChangeCategoryId = (e) => {
  //   const id = e.target.value;
  //   const checked = e.target.checked;

  //   if (checked) {
  //     // Save category id if checked
  //     setCategoryId([...categoryId, parseInt(id)]);
  //   } else {
  //     // Delete category id from variable if unchecked
  //     let newCategoryId = categoryId.filter((categoryIdItem) => {
  //       return categoryIdItem != id;
  //     });
  //     setCategoryId(newCategoryId);
  //   }
  // };

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
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
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("title", form.title);
      formData.set("desc", form.desc);
      formData.set("price", form.price);
      formData.set("qty", form.qty);
      // formData.set("categoryId", categoryId);

      console.log(form);

      // Insert product data
      const response = await API.post("/product", formData, config);
      console.log(response);

      navigate("/product-list");
    } catch (error) {
      console.log(error);
    }
  });

  // useEffect(() => {
  //   getCategories();
  // }, []);

  return (
    <>
      <MainNavbarAdmin title={title} />
      <Container>
        <h4 className="text-light my-4">Add Product</h4>

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
            />
            <InputColumn
              holder="Product Description"
              change={handleChange}
              name="desc"
              as="textarea"
              rows={3}
            />
            <InputColumn
              type="number"
              holder="Price (Rp.)"
              change={handleChange}
              name="price"
            />
            <InputColumn
              type="number"
              holder="Stock"
              change={handleChange}
              name="qty"
            />

            {/* <div className="card-form-input mt-4 px-2 py-1">
              <div className="text-secondary mb-1">
                Category
              </div>
              {categories.map((item, index) => (
                <label className="checkbox-inline me-4" key={index}>
                  <input
                    type="checkbox"
                    value={item.id}
                    onClick={handleChangeCategoryId}
                  />{" "}
                  {item.name}
                </label>
              ))}
            </div> */}

          </div>
          <MainButton type="submit" color="success" btn="Save" />
        </form>
      </Container>
    </>
  );
};

export default AddProductAdmin;
