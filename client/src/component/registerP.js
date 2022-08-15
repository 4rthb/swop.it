import React from 'react';
import { useState } from 'react'

function Register (){
  const [email, setEmail] = useState('')
  const [product, setProduct] = useState('')
  const [productID, setProductID] = useState('')
  const [description, setDescription] = useState('')

  async function registerProduct(event) {
    event.preventDefault()

    const response = await fetch('http://localhost:5000/marketplace/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date,
        email,
        product,
        productID,
        description,
      }),
    })
  }

  return (
    <div>
      <h1>Register Product</h1>
      <form onSubmit={registerProduct}>
        <input
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          type="text"
          placeholder="Product Name"
        />
        <br />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="Product Description"
        />
        <br />
        <input type="submit" value="Register" />
      </form>
    </div>
  )
}

export default Register;
