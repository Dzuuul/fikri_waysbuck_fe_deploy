import React, { useState, useContext } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Button, Form, Modal, Card, Alert } from "react-bootstrap";
import cssModules from "./assets/css/Global.module.css";
import { API } from "../config/api";

const Login = ({ show, Hide, setModalRegisterShow, setModalLoginShow }) => {

  // let navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const {email} = form;

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      const response = await API.post('/login', form)
      
      const alert = (<Alert variant='success' className='py-1'>
        Login Success
      </Alert>)
      setMessage(alert)
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data
      })
      window.location.reload()
    } catch (err) {
      const alert = (<Alert variant='danger' className='py-1'>
        Incorrect Email/Password!
      </Alert>)
      setMessage(alert)
      console.log(err)
    }
  })

  return (
    <>
      <Modal
        show={show}
        onHide={Hide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="position-absolute top-50 start-50 translate-middle p-4"
        style={{ width: "360px" }}
      >
        <Form onSubmit={(e) => handleOnSubmit.mutate(e)}>
          <Card className="p-4" style={{ width: "320px" }}>
            <p className={cssModules.h2Bucks}>Login</p>
            {message && message}

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                className="mb-3"
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                className="mb-3"
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                }}
              />
            </Form.Group>
            <Button type="submit" className={cssModules.bucksBtnRed}>
            {handleOnSubmit.isLoading ? "Redirecting..." : "Login"}
            </Button>
            <p
              className={cssModules.poppins}
              style={{ fontSize: "11pt", margin: "8px 0 0" }}
            >
              Don't have an account ? Click{" "}
              <span
                className="btn text-info"
                style={{ border: "none", padding: "0" }}
                onClick={() => {
                  setModalLoginShow(false);
                  setModalRegisterShow(true);
                }}
              >
                here
              </span>
            </p>
          </Card>
        </Form>
      </Modal>
    </>
  );
};

export default Login;
