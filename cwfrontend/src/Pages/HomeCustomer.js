import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeCustomer() {

  let count = 0;

  return (
    <div>
        <h1>Customer Home Page</h1>
        <Link to="/about"> GO to About page</Link>
        <br />
        <Link to="/vendor"> GO to vendor page</Link>

        <>
          <span className='title'>My count</span>
          <p className='subtitle'>count is {count}</p>
          <button className='btn'>+</button>
          <button className='btn'>-</button>
        </>

    </div>

    
  )
}
