import React, { useState } from 'react'
import ProductForms from '../../components/product/productForm/productForm';
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, selectisLoading } from '../../redux/features/products/productSlice'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/Loader'



const initialState={
    name:"",
    category:"",
    quantity:"",
    price:"",

}

const AddProduct = () => { 
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const [product,setProduct]=useState(initialState);
    const [productImage,setproductImage] = useState("");
    const [imagePreview,setImagePreview]=useState(null);
    const [description,setDescription]= useState("");

    const isLoading=useSelector(selectisLoading);

    const {name,category,price,quantity}=product

    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setProduct({...product,[name]:value})
    };

    const handleImageChange = (e) => {
    setproductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
    const generateSKU=(category)=>{
        const letter=category.slice(0,3).toUpperCase()
        const number=Date.now();
        const sku=letter+'-'+number; 
        return sku; 

    }
    const saveProduct=async(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append("name",name); 
        formData.append("sku",generateSKU(category));
        formData.append("category",category);
        formData.append("quantity",quantity);
        formData.append("price",price);
        formData.append("description",description);
        formData.append("image",productImage);

        console.log(...formData); 
        await dispatch(createProduct(formData)) 

        navigate("/dashboard")
    }

  return <div>
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
  
}

export default AddProduct