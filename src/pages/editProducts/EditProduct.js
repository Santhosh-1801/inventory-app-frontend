import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getProduct, getProducts, selectProduct, selectisLoading, updateProduct } from '../../redux/features/products/productSlice';
import Loader from '../../components/loader/Loader';
import ProductForms from '../../components/product/productForm/productForm';

const EditProduct = () => {
  const {id}=useParams();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const isLoading=useSelector(selectisLoading);

  const productEdit=useSelector(selectProduct)

  const [product,setProduct]=useState(productEdit)
  const [productImage,setProductImage]=useState("");
  const [imagePreview,setImagePreview]=useState(null);
  const [description,setDescription]=useState("");

  useEffect(()=>{
    dispatch(getProduct(id))
  },[dispatch,id])
  useEffect(()=>{
    setProduct(productEdit)
    setImagePreview(
        productEdit && productEdit.image ?`${productEdit.image.filePath}`:null
    )
    setDescription(
        productEdit && productEdit.description ?`${productEdit.description}`:null
    )
  },[productEdit])

  const handleInputChange=(e)=>{
    const {name,value}=e.target;
    setProduct({...product,[name]:value})
  }
  const handleImageChange=(e)=>{
    setProductImage(e.target.files[0])
    setImagePreview(URL.createObjectURL(e.target.files[0]))
  }
  const saveProduct=async(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append("name",product?.name); 
        formData.append("category",product?.category);
        formData.append("quantity",product?.quantity);
        formData.append("price",product?.price);
        formData.append("description",product?.description);
        if(productImage){
        formData.append("image",productImage);
        }

        console.log(...formData); 
        await dispatch(updateProduct({id,formData})) 
        await dispatch(getProducts())

        navigate("/dashboard")
    }


  return (
    <div>
    {isLoading && <Loader/>}
    <h2 className='--mt'>Add New Product</h2>
    <ProductForms
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
    />
  </div>
  )
}

export default EditProduct