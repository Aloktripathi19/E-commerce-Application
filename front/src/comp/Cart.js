import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Ct from './Ct'
import axios from 'axios'

function Cart() {
  let obj = useContext(Ct)
  let navigate = useNavigate()
  let [cart, ucart] = useState([])
  let [total, utotal] = useState(0)
  let [f, setF] = useState(true)

  useEffect(() => {

    if (obj.state._id === "") {
      navigate("/login")
    } else {
      axios.get(`http://localhost:5000/getcart/${obj.state._id}`,{
        "headers":{"Authorization":obj.state.token}
      }).then((res) => {
        ucart(res.data)
        obj.updstate({ "cartlength": res.data.length })
        let s = 0
        for (let i = 0; i < res.data.length; i++) {
          s = s + res.data[i].qty * res.data[i].price
        }
        utotal(s)
      })
    }
  }, [f, navigate, obj.state._id])






  let shop = () => {
    navigate("/")

  }

  let inc = (cid) => {
    axios.get(`http://localhost:5000/inc/${cid}`,{"headers":{"Authorization":obj.state.token}}).then((res) => {
      setF(!f)
    })
  }

  let dec = (cid, qty) => {
    if (qty > 1) {
      axios.get(`http://localhost:5000/dec/${cid}`,{"headers":{"Authorization":obj.state.token}}).then((res) => {
        setF(!f)
      })
    } else {
      del(cid)
    }
  }

  let del = (cid) => {
    axios.delete(`http://localhost:5000/delcart/${cid}`,{"headers":{"Authorization":obj.state.token}}).then((res) => {
      setF(!f)
    })
  }






  return (
    <div className='cart-con'>


      {cart.length === 0 && <div className='cart-empty'>
        <img src='https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90' alt='err' />
        Your cart is empty! Start adding some amazing products.
        <button className='cart-shop' onClick={shop}>Shop Now</button></div>}


      {cart && cart.map((prodobj) => {
        return (

          <div className='cart'>
            <img src={`http://localhost:5000/pimgs/${prodobj.pimg}`} alt='product' />

            <div className='cart-body'>
              <h3>{prodobj.name}</h3>
              <p>Price : {prodobj.price}</p>
              <div className='cart-btn'>
                <div className='cart-qty'>
                  <button onClick={() => dec(prodobj._id, prodobj.qty)}>-</button>{prodobj.qty}<button onClick={() => inc(prodobj._id)}>+</button>
                </div>
                <button className='cart-del' onClick={() => del(prodobj._id)}>Delete</button>
                <button className='cart-buy'>Buy Now</button>
              </div>
            </div>

          </div>
        )
      })
      }
      {cart.length > 0 && <div className='cart-nav'>
        <div className='cart-total'>
          <i className="fas fa-shopping-bag"></i> Cart Total : {total}
        </div>
        <button className='cart-shop'>Place Order</button>
      </div>}
    </div>
  )
}

export default Cart