import React, { useEffect } from 'react'
import useRedirectLoggedOut from '../../customHook/useRedirectLoggedOut' 
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice'
import { getProducts } from '../../redux/features/products/productSlice'
import ProductList from '../../components/product/productList/ProductList'
import ProductSummary from '../../components/product/productSummary/productSummary'


const Dashboard = () => {
  useRedirectLoggedOut("/login")
  const dispatch=useDispatch(); 

  const isLoggedin=useSelector(selectIsLoggedIn); 
  const {products,isLoading,isError,message}=useSelector((state)=>state.product);
 
  useEffect(()=>{
     if(isLoggedin===true){
      dispatch(getProducts())
     }
     console.log(products)
     if(isError){
      console.log(message);
     }
     
  },[isLoggedin,isError,message,dispatch])


  return (
    <div>
     <h2>
      Dashboard
      <ProductSummary products={products}/>
      <ProductList  products={products} isLoading={isLoading}/>
      </h2> 
      </div>
  )
}

export default Dashboard