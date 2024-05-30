import React from 'react'
import { Link } from 'react-router-dom'
const EmailVerification = () => {
  return (
    <>
        
        <section className='flex justify-center items-center'>
        <Link to={'/dashbord'}>
        <button>verify</button>
        </Link>
        </section>
    </>
  )
}

export default EmailVerification