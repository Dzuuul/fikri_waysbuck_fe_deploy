import React, { useState, useContext } from "react";
import { useMutation } from 'react-query';
import { Card, Button, Form, Modal, Alert } from "react-bootstrap";
import cssModules from "./assets/css/Global.module.css";
import { UserContext } from "../context/UserContext";

import { API } from "../config/api";

const Register = ({ show, Hide, setModalRegisterShow, setModalLoginShow }) => {
  // const users = [];

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleOnSubmit = useMutation(async (e) => {

    try {
      e.preventDefault()
      
      await API.post('/register', form)

      const alert = (<Alert variant='success' className='py-1'>
        Register Success
      </Alert>)
      setMessage(alert)
      setModalRegisterShow(false)
      setModalLoginShow(true)
    } catch (err) {
      const alert = (<Alert variant='danger' className='py-1'>
       Register Failed
      </Alert>)
      setMessage(alert)
      console.log(err)
    }
  });

  return (
    <Modal
      show={show}
      onHide={Hide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="position-absolute top-50 start-50 translate-middle p-4"
      style={{ width: "380px" }}
    >
      <div className="form-group">
        <Form onSubmit={(e) => handleOnSubmit.mutate(e)}>
          <Card className="p-4" style={{ width: "340px" }}>
            <p className={cssModules.h2Bucks}>Register</p>
            {message && message}
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                className="mb-3"
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                }}
                name="email"
                type="email"
                placeholder="Email"
                // value={email}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control
                className="mb-3"
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                }}
                name="password"
                type="password"
                placeholder="Password"
                // value={password}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicName">
              <Form.Control
                type="text"
                placeholder="Full Name"
                name="name"
                // value={name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                }}
                required
              />
            </Form.Group>
            <Button type="submit" className={cssModules.bucksBtnRed}>
            {handleOnSubmit.isLoading ? "Signing Up..." : "Register"}
            </Button>
            <p
              className={cssModules.poppins}
              style={{ fontSize: "11pt", margin: "8px 0 0" }}
            >
              Already have an account ? Click{" "}
              <span
                className="btn text-info"
                style={{ border: "none", padding: "0" }}
                onClick={() => {
                  setModalRegisterShow(false);
                  setModalLoginShow(true);
                }}
              >
                here
              </span>
            </p>
          </Card>
        </Form>
      </div>
    </Modal>
  );
};

export default Register;
