import React, { useEffect,useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { axiosClient } from '../api/axios'



const ProtectedLayout = () => {
  const [user,setUser ] = useState()
  const location = useLocation();
  const navigate = useNavigate();
  useEffect( ()=>{
    const fetching = async ()=>{
      const user = await axiosClient.get('/api/user');
    console.log(user)
    }
     fetching();
  },[])
  // useEffect(()=>{
  //   console.log(user)
  // },[user])
  useEffect(()=>{
    if(!window.localStorage.getItem('ACCESS_TOKEN')){
      navigate('/login')
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

export default ProtectedLayout