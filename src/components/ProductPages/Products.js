import React, {useEffect, useState} from 'react'
import {getAllProducts, clearErrors} from '../../actions/productAction'
import { useSelector, useDispatch } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import "../../Style/ProductCard.css";
import Loader from '../../layout/Loader';
import { Link,useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ProductCard from './ProductCard';
import { BsFillGridFill } from "react-icons/bs";
import { VscListFlat } from "react-icons/vsc";
import SearchBar from '../Filter/SearchBar';
import ReactPaginate from 'react-paginate';
import '../../Style/Products.css'
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
const Products = () => {
  let categories = [
    "Laptop",
    "Ear pods",
    "Mouse",
    "Bags",
    "Shoes",
    "Car",
  ]
  let {keyword} = useParams()
    const dispatch = useDispatch()
    const {loading, products, productCount, error, resultPerPage,filteredProducts} = useSelector((state)=> state.products)
    const[currentPage, setCurrentPage] = useState(0)
    const[price, setPrice] = useState([0,25000])
    const[category, setCategory] = useState('')
    const[rating, setRating] = useState(0)
    const[clearfilters, setClearfilters] = useState("")




    const handlePageClick = (event) =>{
      const newOffset = event.selected+1;
      alert(`User requested page number ${event.selected}, which is offset ${newOffset}`);
      setCurrentPage(newOffset)
    }
    const prizeHandler = (event, newPrice) =>{
      setPrice(newPrice)
    }
    const ratingsHandler = (event, newRating)=>{
      setRating(newRating)
    }

    const clearAllfilters = ()=>{
      setPrice([0,25000])
      setRating(0)
      setCategory('')
    }

    useEffect(() => {
      if (error) {
        toast.error(error)
        dispatch(clearErrors())
      }
        dispatch(getAllProducts(keyword, currentPage,price, category, rating))

        console.log(products)
      },[dispatch, keyword,currentPage,price,category, rating]);

  let count = filteredProducts
  return (
    <>
      {loading ? <Loader/>:     
      
        <>

        {/* outer div */}

        <div className="outer">
<h2>Products</h2>
        {/* search-row */}
          <div className="search-row">

          <div className="search-bar">
            <SearchBar/>
          </div>

        <div className="grid-icons">
            <BsFillGridFill/>
            <VscListFlat/>
        </div>

        <div className="total-products">
          <span>5 products</span>
        </div>
        
          </div>

<div className="two-colums-div">

<div className="filters-div">

    <div className="head-main flex space-x-7 space-x-4">
    <Typography>Filters</Typography>
    <button onClick={clearAllfilters} className='filter-button p-1 bg-blue-500 text-white' type="reset">Clear Filters</button>
    </div>

        <div className="category">
          <h1>Category</h1>
          <ul>

          {categories && categories.map((val,index) =>
          (<li onClick={()=> setCategory(val)} className='links cursor-pointer active:text-blue-700 ' key={index}  >{val}</li>)
          )}  
          </ul>
        </div>

        <div className="prize w-36 m-12">
        <Typography>Price</Typography>
        <p>{price[0]} - {price[1]}</p>
        <Slider
  getAriaLabel={() => 'Temperature range'}
  value={price}
  onChange={prizeHandler}
  valueLabelDisplay="auto"
  // aria-labelledby='range-slider'
  aria-labelledby='continuous-slider'
  min = {0}
  max = {25000}
  size={"small"}
  step={1000}
  marks
/>
 </div>

<div className="ratings-product w-24 m-4">
<Typography>Above Ratings</Typography>
<Slider 
// aria-label="Volume" value={rating} onChange={ratingsHandler} 
value={rating}
onChange={ratingsHandler}
valueLabelDisplay="auto"
// aria-labelledby='range-slider'
aria-labelledby='continuous-slider'
min = {0}
max = {5}
step={1}
// marks
/>
</div>



</div>
{/* filters-div */}


<div className="product-div ">
<section className="text-gray-600 body-font">
        <div className="container py-24 mx-auto">
          <div className="flex md:items-center md:justify-start justify-center  flex-wrap -m-4">
{products && products.map((elem) => (
   <ProductCard prod = {elem} key = {elem._id}/>
))}
  </div>
        </div>
      </section>
 </div>

</div>






{/* outer div close */}
 </div>

{resultPerPage<count && <div className="pagination flex flex-row">
<ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        containerClassName = {"page-container"}
        // pageClassName = {"page-links"}
        pageLinkClassName = {"page-links"}
        onPageActive = {setCurrentPage}
        onPageChange={handlePageClick}
        pageRangeDisplayed={productCount}
        // prevRel = {setCurrentPage-1}
        // nextRel = {setCurrentPage+1}
        // pageCount={Math.round(productCount/resultPerPage)}
        pageCount={Math.round((productCount/resultPerPage))}
        previousLabel="Previous"
        // activeClassName = {"active-class"}
        // activeLinkClassName = {"active-class-link"}
        previousClassName = {"prev-class1"}
        nextClassName = {"nxt-class1"}
        nextLinkClassName = {"nxt-class"}
        // previousLinkClassName = {"prev-class"}
        // disabledClassName = {"d"}
        // disabledLinkClassName = {"d"}
      />
</div>}



        </>
      }

      
   </>

  )}

export default Products
