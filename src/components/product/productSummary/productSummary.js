import React, { useEffect } from 'react'
import "./productSummary.scss"
import { AiFillDollarCircle } from 'react-icons/ai' 
import {BsCart4,BsCartX} from "react-icons/bs";
import { BiCategory } from 'react-icons/bi';
import Infobox from '../../Infobox/Infobox';
import { useDispatch, useSelector } from 'react-redux'; 

import { CALC_STORE_VALUE,CALC_OUTOFSTOCK,CALC_CATEGORY,selectStoreValue,selectOutofStockValue, selectcategory } from '../../../redux/features/products/productSlice';


const earningIcon=<AiFillDollarCircle size={40} color='#fff'/>
const productIcon=<BsCart4 size={40} color="#fff"/>
const categoryIcon=<BiCategory size={40} color='#fff'/> 
const outOfStockIcon=<BsCartX size={40} color="#fff"/>

export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};



const ProductSummary = ({products}) => {
  const dispatch = useDispatch(); 
  const totalStoreValue=useSelector(selectStoreValue)
  const outofStockValue=useSelector(selectOutofStockValue)
  const totalCategory=useSelector(selectcategory)

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
    dispatch(CALC_OUTOFSTOCK(products));
    dispatch(CALC_CATEGORY(products))
    }
   ,[dispatch,products])
  
  

  return <div className='product-summary'>
  <h3 className='--mt'>Inventory Statistics</h3>
  <div className='info-summary'>
    <Infobox icon={productIcon} title={"Total Products"} count={products.length} bgColor="card1"/>
     <Infobox icon={earningIcon} title={"Total Store Value"} count={`$${formatNumbers(totalStoreValue)}`}bgColor="card2"/>
     <Infobox
          icon={outOfStockIcon}
          title={"Out of Stock"}
          count={outofStockValue}
          bgColor="card3"
        />
        <Infobox
          icon={categoryIcon}
          title={"All Categories"}
          count={totalCategory.length}
          bgColor="card4"
        />
  </div>
  </div>

}

export default ProductSummary;