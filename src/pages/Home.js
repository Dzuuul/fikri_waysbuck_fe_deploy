import React, {useState, useContext} from "react";
import { useQuery } from "react-query";
import jumbotronRectangle from '../components/assets/images/jumbotronRectangle.png'
import jumboImg from '../components/assets/images/jumboImg.png'
import { Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import cssModules from "../components/assets/css/Global.module.css"
import cssHome from "../components/assets/css/home.module.css"
import Rupiah from "rupiah-format";
import NavbarBucks from "../components/Navbar";
import { UserContext } from "../context/UserContext";
import { API } from "../config/api";
import Login from "../components/Login";
import Register from "../components/Register";


const Home = () => {
    document.title = 'WaysBucks'
    
    // modal login
  const [modalRegisterShow, setModalRegisterShow] = useState(false);
  const [modalLoginShow, setModalLoginShow] = useState(false);
  const [state] = useContext(UserContext); // user data
  const handleClick = () => setModalLoginShow(true);


  // Fetching product data from database
  let { data: products } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });

    return (
    <>
    <NavbarBucks />
    <Stack direction="horizontal" gap={3}>
        <div className={cssModules.jumboContainer}>
            <div className={cssModules.jumboRect}>
                <p className={cssModules.jumboTitle}>WAYSBUCKS</p>
                <p className={cssModules.jumboSubTitle}>Things are changing, but we're still here for you</p>
                <p className={cssModules.jumboDescription}>We have temporarily closed our in-store cafes, but select grocery and drive-thru locations remaining open. Waysbucks Drivers is also available<br/><br/>Let's Order...</p>
                <img src={jumbotronRectangle} alt="" />
            </div>
            <div className={cssModules.jumboImg}>
                <img src={jumboImg} alt="" />
            </div>
        </div>
    </Stack>
    <div className={cssModules.jumboContainer} style={{height: "50px"}}>
        <p className={cssModules.h2Bucks} >Let's Order</p>
    </div>
        <Register show={modalRegisterShow} Hide={() => setModalRegisterShow(false)} setModalLoginShow={setModalLoginShow} setModalRegisterShow={setModalRegisterShow}/>
        <Login show={modalLoginShow} Hide={()=> setModalLoginShow(false)} setModalLoginShow={setModalLoginShow} setModalRegisterShow={setModalRegisterShow} />
    <section className={cssModules.jumboContainer}>
          <div className="d-flex flex-wrap">
            {products?.map((item, index) => (
              <div className={cssHome.card} style={{marginRight: "15px", marginBottom: "15px"}} key={index}>
                <div className={cssHome.card1}>
                  <Link
                    to={
                      state.isLogin === true ? `/detail-product/${item.id}` : ""
                    }
                    onClick={state.isLogin === false ? handleClick : ""}
                  >
                    <img
                      className={cssHome.imageP}
                      src={item.image}
                      alt="ProductImage"
                    />
                  </Link>
                  <div className={cssHome.card2}>
                    <p className={cssHome.text1}>
                      {item.title.substring(0, 17)}...
                    </p>
                    <p className={cssHome.text2}>
                      {Rupiah.convert(item.price)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
    </>

    )
}

export default Home