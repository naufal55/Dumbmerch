import React, { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';

import { Alert, Card, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import InputColumn from "../Atom/InputColumn";
import MainButton from "../Atom/MainButton";

import { useMutation } from 'react-query';

import { API } from '../config/api';

const CardFormReg = (props) => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  
  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = form;

  const handleOnChange = (e) => {
    //update nilai saat isi value di kolom input
    // setForm here
    setForm({
      ...form, //extarct form
      //beri nilai setForm untuk value yg di kolom input, sesuai dengna name form control
      [e.target.name]: e.target.value,
    });
    console.log(form);
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault(); //mencegah reload
      // Configuration Content-type
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post('/register', body, config);
      console.log(response);

      if(response.data.status === 'success'){
        const alert = (
          <Alert variant="success" className="py-1">
            Register Success
          </Alert>
        );
        //setmassage register success and set column register is null
        setMessage(alert)
        setForm({
          name: '',
          email: '',
          password: '',
        })
      }else{
        const alert = (
          <Alert variant="danger" className="py-1">
            Register Failed
          </Alert>
        );
        setMessage(alert)
      }  
      // Handling response here
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
    //print form value with console.log here
    // console.log(form); //tampilkan yang diketik disini

  });
  const handleRegister = () => {
    // navigate("/login");
  };

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
                value={name}
                name="name"
                type="text"
                holder="Name"
              />
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
            <MainButton click={handleRegister} type="submit" btn={props.btnName} color="danger" />
          </Form>
        </Card.Body>
      </Col>
      {/* <p className="text-light">Nama : {form.name}</p>
      <p className="text-light">email : {form.email}</p>
      <p className="text-light">pass : {form.password}</p> */}
    </>
  );
};

export default CardFormReg;
