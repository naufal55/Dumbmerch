import React, { Component, useState, useContext, } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

import { Alert, Card, Col, Form } from "react-bootstrap";
import InputColumn from "../Atom/InputColumn";
import MainButton from "../Atom/MainButton";

// Import useMutation from react-query here ...
import { useMutation } from 'react-query';

// Get API config here ...
import { API } from '../config/api';

const CardFormLog = (props) => {
  const navigate = useNavigate()
  

  const [state, dispatch] = useContext(UserContext);
  // console.log(state);
  const [message, setMessage] = useState(null);
  
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;
  
  const handleOnChange = (e) => {
    //update nilai saat isi value di kolom input
    // setForm here
    setForm({
      ...form, //extarct form
      //beri nilai setform untuk value yg di kolom input, sesuai dengna name form control
      [e.target.name]: e.target.value,
    });
    // console.log(form);
  };
  
// Create function for handle insert data process with useMutation here ...
const handleSubmit = useMutation(async (e) => {
  try {
    e.preventDefault();


    // Configuration Content-type
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    // Data body
    const body = JSON.stringify(form);

    // Insert data user to database
    const response = await API.post('/login', body, config);
    console.log(response);

    if(response.data.status === 'success'){
      dispatch({
        type:'LOGIN_SUCCESS',
        payload: response.data.data
      })
    }

    if(response.data.data.status === 'admin'){
      navigate('/complain-admin')
    }
    if(response.data.data.status === 'customer'){
      navigate('/homepage')
    }

    const alert = (
      <Alert variant="success" className="py-1">
        Login success
      </Alert>
    );
    setMessage(alert);

    // Handling response here
  } catch (error) {
    const alert = (
      <Alert variant="danger" className="py-1">
        Failed
      </Alert>
    );
    setMessage(alert);
    // console.log(error);
  }
});

  return (
    <>
      <Col md={4} sm={12} className="bg-dark rounded-3 h-100 pb-2">
        <Card.Body>
          <h2 className="text-light my-3">{props.btnName}</h2>
          {message && message}
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <div className="my-4">
            <InputColumn
                change={handleOnChange}
                value={email}
                name="email"
                type="email"
                holder="Email"
              />
              <InputColumn
                change={handleOnChange}
                value={password}
                name="password"
                type="password"
                holder="Password"
              />
            </div>
            <MainButton type="submit" btn={props.btnName} color="danger" />
          </Form>
        </Card.Body>
      </Col>
      {/* <p className="text-light">email : {form.email}</p>
      <p className="text-light">pass : {form.password}</p> */}
    </>
  );
};

export default CardFormLog;
