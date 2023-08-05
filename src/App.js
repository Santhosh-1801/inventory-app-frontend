import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home"; 
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Reset from "./pages/auth/Reset";
import Forgot from "./pages/auth/Forgot";
import Sidebar from "./components/sidebar/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard"; 
import Layout  from "./components/layout/Layout"
import axios from "axios"
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import AddProduct from "./pages/addProducts/AddProduct"; 
import ProductDetail from "./components/product/productDetail/productDetail";
import EditProduct from "./pages/editProducts/EditProduct";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Contact from "./pages/Contact/Contact";


axios.defaults.withCredentials=true;

function App() {
  const dispatch=useDispatch();

  useEffect(()=>{
    async function loginStatus(){
      const status=await getLoginStatus() 
      dispatch(SET_LOGIN(status))
    }
    loginStatus()
  },[dispatch])
  return (
    <BrowserRouter>
    <ToastContainer/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/forgot" element={<Forgot/>}/>
      <Route path="/resetpassword/:resetToken" element={<Reset/>}/>
      <Route path="/dashboard" element={<Sidebar>
        <Layout>
          <Dashboard></Dashboard>
        </Layout>
      </Sidebar>}></Route>
      <Route path="/add-product" element={<Sidebar>
        <Layout>
          <AddProduct/>
        </Layout>
      </Sidebar>}></Route>
      <Route path="/product-detail/:id" element={<Sidebar>
        <Layout>
          <ProductDetail/>
        </Layout>
      </Sidebar>}></Route>
      <Route path="/edit-product/:id" element={<Sidebar>
        <Layout>
          <EditProduct/>
        </Layout>
      </Sidebar>}></Route>
      <Route path="/profile" element={<Sidebar>
        <Layout>
          <Profile/>
        </Layout>
      </Sidebar>}></Route>
      <Route path="/edit-profile" element={<Sidebar>
        <Layout>
          <EditProfile/>
        </Layout>
      </Sidebar>}></Route>
      <Route path="/contactus" element={<Sidebar>
        <Layout>
          <Contact/>
        </Layout>
      </Sidebar>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
