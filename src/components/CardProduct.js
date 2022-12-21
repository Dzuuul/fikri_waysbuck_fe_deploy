import React from "react";
import { Card, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import cssModules from "../components/assets/css/Global.module.css"
import Products from "./Products";
import Login from './Login';
import Register from './Register';


const ProductList = (props) => {
  const [modalRegisterShow, setModalRegisterShow] = React.useState(false);
  const [modalLoginShow, setModalLoginShow] = React.useState(false);

  let isLogin = JSON.parse(localStorage.getItem("LOGIN_DATA"))

  const navigate = useNavigate()
  const productRoute = `/product/${props.title}/${props.id}`

  return (
    <>
        <Card key={props.id} style={{ width: '18rem', borderRadius: '13px', background: "#F7DADA", border: "none" }} onClick={() => isLogin === null ? (setModalLoginShow(true)) : (navigate(productRoute))}>

        <Login show={modalLoginShow} Hide={()=> setModalLoginShow(false)} setModalLoginShow={setModalLoginShow} setModalRegisterShow={setModalRegisterShow} />
        <Register show={modalRegisterShow} Hide={() => setModalRegisterShow(false)} setModalLoginShow={setModalLoginShow} setModalRegisterShow={setModalRegisterShow}/>

          <Card.Img variant="top" src={props.image} />
          <Card.Body className={cssModules.poppins}>
            <Card.Title style={{ color: "#BD0707", fontSize: "18px"}}><b>{props.title}</b></Card.Title>
            <Card.Text style={{ fontSize: "14px" }}>
                Rp. {props.price}
            </Card.Text>
          </Card.Body>
          
        </Card>
    </>
  )
}


const CardProduct = () => {
    return (
    <Stack direction="horizontal" gap={3} className='' style={{margin: "50px auto 20px", width: "1072px", height: "392px"}} >

        {/* card */}
        {Products.map((Products) => (
        <ProductList key={Products.id} id={Products.id} title={Products.title} image={Products.image} price={Products.price}/>
        ))}
    
    </Stack>
    )
}

export default CardProduct