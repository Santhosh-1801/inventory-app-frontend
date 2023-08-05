import React, { useEffect } from 'react'
import useRedirectLoggedOut from '../../../customHook/useRedirectLoggedOut'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectIsLoggedIn } from '../../../redux/features/auth/authSlice';
import { getProduct } from '../../../redux/features/products/productSlice';
import Card from "../../card/Card"
import { SpinnerImg } from '../../loader/Loader';
import "../../product/productDetail/productDetail.scss" 
import DOMPurify from "dompurify"

const ProductDetail = () => {
  useRedirectLoggedOut("/login");
  const dispatch=useDispatch();


const isLoggedin=useSelector(selectIsLoggedIn); 
  const {product,isLoading,isError,message}=useSelector((state)=>state.product);
  const stockStatus=(quantity)=>{
    if(quantity>0){
    return <span className='--color-success'>In Stock</span>
    }
    return <span className='--color-danger'>Out of Stock</span>
  }
 
  useEffect(()=>{
     if(isLoggedin===true){
      dispatch(getProduct(id))
      console.log(product)
     }
  
     if(isError){
      console.log(message);
     }
     
  },[isLoggedin,isError,message,dispatch])



  const {id}=useParams();
  return <div className='product-detail'>
<h2 className='--mt'>Product Detail</h2>
<Card cardClass={"card"}>
{isLoading && <SpinnerImg/>}

{product && (
  <div className='detail'>
    <Card className="group">
      {product?.image ?(
      <img src={product.image.filePath} alt={product.image.fileName}/>):"<p>No Image set for this Product</p>"}
    </Card>
    <h4>Product Availability:{stockStatus(product.quantity)}</h4>
    <hr/>
    <h4>
      <span className='badge'>Name:</span>&nbsp;{product.name}
    </h4>
    <p><b>&rarr; SKU :</b> &nbsp;{product.sku}</p>
    <p><b>&rarr; Category :</b> &nbsp;{product.category}</p>
    <p><b>&rarr; Price:</b> &nbsp;{"$"}{product.price}</p>
    <p><b>&rarr; Quantity in stock :</b> &nbsp;{product.quantity}</p>
    <p><b>&rarr; Total value in stock :</b> &nbsp;{product.price * product.quantity}</p>
    <hr/>
    <div dangerouslySetInnerHTML={{
      __html:DOMPurify.sanitize(product.description)
    }}>
    </div>
    <hr/>
    <code className="--color-dark">Created on:{product.createdAt.toLocaleString("en-US")}</code>
    <br />
    <code className="--color-dark">Created on:{product.createdAt.toLocaleString("en-US")}</code>
    </div>
)}
</Card>
  </div>
}

export default ProductDetail