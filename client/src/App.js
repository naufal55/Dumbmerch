import { useState, useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { UserContext } from './context/userContext';

import MainNavbar from "./Component/MainNavbar";
import { PrivateOut, PrivateRoute } from "./Component/PrivateRoute";
import { AddCategoriesAdmin,ChatComplainAdmin,CategoryList,EditProfile, ChatComplain, DetailPage, EditCategory, EditProduct, HomePages, LoginPages, NotFound, ProductList, Profile, RegisterPages, AddProductAdmin } from "./Pages";

import { setAuthToken, API } from './config/api';

if(localStorage.token){
  setAuthToken(localStorage.token)
}

function App() {
  //useNavigate can use in browserRouter or router only
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext)
  // console.log(state);

  useEffect(() => {
    // Redirect Auth
    if (state.isLogin === false) {
      navigate('/login');
    } else {
      if (state.user.status === 'admin') {
        navigate('/complain-admin');
      } else if (state.user.status === 'customer') {
        navigate('/homepage');
      }
    }
  }, [state]);


  // Create function for check user token here ...
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
      let payload = response.data.data.user;
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
  
  // const isLogin = localStorage.getItem('user')
  // const isLogin = true
  const [isLogin, setIsLogin] = useState()
  const handleIsLogin = () => setIsLogin(true);
  const handleIsLogout = () => setIsLogin(false);
  
  const isAdmin = false
  
  return (
    
    <Routes>
        {/* {isLogin? <MainNavbar out={handleIsLogout} admin={isAdmin}/> : ""} */}
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/" element={<PrivateOut login={isLogin} />}> */}
          {/* if false */}
          {/* <Route path="/" element={<LoginPages click={handleIsLogin}/>} /> */}
          <Route path="/login" element={<LoginPages/>} />
          <Route path="/register" element={<RegisterPages />} />
        {/* </Route> */}
        {/* <Route path="/" element={<PrivateRoute login={isLogin} />}> */}
          {/* if false */}
          <Route path="/homepage" element={<HomePages />} />
          <Route path="/detail-page/:id" element={<DetailPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/category-list" element={<CategoryList />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/edit-category/:id" element={<EditCategory />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/complain" element={<ChatComplain />} />
          <Route path="/complain-admin" element={<ChatComplainAdmin />} />
          <Route path="/edit-profile/:id" element={<EditProfile />} />
          <Route path="/add-product" element={<AddProductAdmin />} />
          <Route path="/add-categories" element={<AddCategoriesAdmin />} />
          {/* <Route path="/logout"/> */}
        {/* </Route> */}
      </Routes>
    
  );
}

export default App;