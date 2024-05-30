import { use } from 'i18next'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { axiosClient } from '../api/axios'


const GeussLayout = () => {
  const navigate = useNavigate();

 
  useEffect(()=>{
    if(window.localStorage.getItem('ACCESS_TOKEN')){
      navigate('/dashbord')
    }
  },[])
  return (
    <>
        
        <main>
            <Outlet/>
        </main>
        
    </>
  )
}

export default GeussLayout