import React, { useContext, useEffect} from "react";
import { Route, Routes, useNavigate } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/components/assets/css/style.css"
import { UserContext } from "./context/UserContext";
import { API, setAuthToken } from "./config/api";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CartPage from "./pages/Cart";
import DetailProduct from "./pages/DetailProduct";
import Transaction from "./pages/Transaction"
import AddTopping from "./pages/AddTopping";
import AddProduct from "./pages/AddProduct";

// Init token on axios every time the app is refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {

  let navigate = useNavigate();

  // Init user context 
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    // Redirect Auth
    if (state.isLogin === false) {
      navigate('/');
    } else {
      if (state.user.status === 'admin') {
        navigate('/transaction');
      } else if (state.user.status === 'customer') {
        navigate('/');
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/detail-product/:id" element={<DetailProduct/>}/>
        <Route exact path="/cart" element={<CartPage />} />
        <Route exact path="/transaction" element={<Transaction />} />
        <Route exact path="/add-topping" element={<AddTopping />} />
        <Route exact path="/add-product" element={<AddProduct />} />
      </Routes>
    );
}

export default App;
