import { use } from 'i18next'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { axiosClient } from '../api/axios'
import Links from '../router/Links'


const GeussLayout = () => {
  const navigate = useNavigate();

 
  useEffect(()=>{
    if(window.localStorage.getItem('ACCESS_TOKEN')){
      navigate(Links.dashboard)
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