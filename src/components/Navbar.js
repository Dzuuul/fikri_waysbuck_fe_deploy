// dependencies
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { API } from "../config/api";
import { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import css from "../components/assets/css/Global.module.css"

// components
import Dropdown from "./NavbarDropdown";
import Login from "./Login";
import Register from "./Register";

// files
import Logo from "../components/assets/images/group.png";
import Cart from "../components/assets/images/chart.png";

export default function NavbarBucks() {
  const [modalRegisterShow, setModalRegisterShow] = useState(false);
  const [modalLoginShow, setModalLoginShow] = useState(false);

  const [state] = useContext(UserContext);
  const isLogin = state.isLogin;

  const [bubble, setBubble] = useState([]);

  useEffect(() => {
    API.get("/carts-id")
      .then((res) => {
        setBubble(res.data.data);
      })
      .catch((err) => console.log("error", err));
  });

  return (
    <nav>
      <div>
        <Link to={state.user.status === "customer" ? "/" : "/transaction"}>
          <img src={Logo} alt="Logo" className="navbarLogo" />
        </Link>
      </div>
      {isLogin ? (
        <div className="navbarRight">
          <div
            className={
              bubble === undefined
                ? "d-none"
                : bubble?.length === 0
                ? "d-none"
                : "circle"
            }
          >
            {bubble?.length}
          </div>
          <Link to={"/cart"}>
            <img
              src={Cart}
              alt="cart"
              className={
                state.user.status === "customer" ? "navbarCart" : "d-none"
              }
            />
          </Link>
          <Dropdown />
        </div>
      ) : (
        <Stack direction="horizontal" gap={3} className="mx-5">
        <Button variant='outline-danger' className={css.btnOD} onClick={() => setModalRegisterShow(true)}>Register</Button>
        <Register show={modalRegisterShow} Hide={() => setModalRegisterShow(false)} setModalLoginShow={setModalLoginShow} setModalRegisterShow={setModalRegisterShow}/>
        <Button variant='danger' className={css.btnD} onClick={() => setModalLoginShow(true)}>Login</Button>
        <Login show={modalLoginShow} Hide={()=> setModalLoginShow(false)} setModalLoginShow={setModalLoginShow} setModalRegisterShow={setModalRegisterShow} />
        </Stack>
      )}
    </nav>
  );
}
