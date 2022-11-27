import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';


const SearchBar = () => {
  let history = useNavigate()
  const [keyword, setKeyword] = useState("")
  const searchHandler = (e) =>{
    e.preventDefault()
    if(keyword.trim()){
      history(`/product/getproducts/${keyword}`)
    }
    else{
      history(`/product/getproducts`)
    }
    
  }
  return (
    <>
    <form onSubmit={searchHandler}>
      <input value={keyword} className='bg-red-200' onChange={(e)=> setKeyword(e.target.value)} type="search" placeholder='Search a product'/>

    </form>
    </>
  )
}

export default SearchBar
