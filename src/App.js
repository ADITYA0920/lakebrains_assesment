import React, { useEffect, useMemo, useState } from 'react'
import "./App.css" 

const App = () => {
  let [search,setSearch] = useState("") ;
  let [data,setData] = useState({
    name:"",
    temp:"",
    main:"",
  })
  const wipeData = ()=>{
    setSearch("") ;
  }
  const searchData = ()=>{
    let popup = document.querySelector('.popup-message') ;
    popup.style.disply = 'block';
  }
  const fetchData = async(e)=>{
   e.preventDefault() ;
   let Key =  "840de593b7028de6e424162454790fe5"
   let url =  `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${Key}`

   let data = await fetch(url) ;
   let res = await data.json();

   console.log(res) ;

   setData({
     name : res.name,
     temp :res.main.temp ,
     main : res.clouds
   }) 
  }
  // let memo = useMemo(fetchData,search) ;

  const cancelBtnClick = ()=>{
    let popup = document.querySelector('.popup-message') ;
    popup.style.disply = 'none';
  }
  // useEffect( async() => {
    
  // },search)

  return (
    <div className='container'>
      <form onSubmit={fetchData}>
        <div>
        <input type='text' placeholder='search' value={search} onChange={(e)=>setSearch(e.target.value)}/>
        <button onClick={wipeData}>x</button>
        </div>
        <button onClick={searchData}>search</button>
      </form>
      <div className='popup'>
        {
          data && (
            <div className='popup-message'>
              <div className='container2'>
                <h3>name : {data.name}</h3>
                <h3>temp : {data.temp}</h3>
                <h3>main : {data.main}</h3>
              </div>
              <button id='cancel-button' onClick={cancelBtnClick}>x</button>
            </div>
          )          
        }
      </div>
    </div>
  )
}

export default App ;