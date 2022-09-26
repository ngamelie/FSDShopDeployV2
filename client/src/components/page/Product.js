import React, {useState, useEffect, Component} from "react";
import { Button, Card, Alert, Nav, variant } from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";

import validator from 'validator';
import Axios from "axios"
import '../../asset/common/Style.css'
import config from '../config/Config'
const PATH = config().path + "/product"

function Product() {
  
  let { id } = useParams();
  const [product, setProduct] = useState([])
  //const [quantity, setQuantity] = useState(0)
  const quantity = 1
  const [msg, setMsg] = useState("")
  const [uemail, setUemail] = useState("")

  useEffect(() => {
    Axios.get(PATH +`/${id}`).then((rs) => {
      //console.log(rs.data.pid);
      setProduct(rs.data);
    });

    if(sessionStorage.getItem("token") && sessionStorage.getItem("token") != "null"){
      const email = JSON.parse(sessionStorage.getItem("token")).user.uemail
      setUemail(email)
    }

  }, []);

  const btn_addtocart = () => {
    const emptyCart = {
      "uemail" : uemail,
      "items" : []
    }

    const currentItem = {
      "quantity" : quantity,
      "product" : product
    }
    
    if(localStorage.getItem("mycart") && localStorage.getItem("mycart") != "null") {
      const myCart = JSON.parse(localStorage.getItem("mycart"))
      var isInMyCart = false
      myCart.items.forEach((item)=>{
        if(item.product.pid == product.pid){
          item.quantity = parseInt(item.quantity) + parseInt(quantity)
          isInMyCart = true
        }
      })

      if(!isInMyCart)
        myCart.items.push(currentItem)
      localStorage.setItem("mycart", JSON.stringify(myCart))
    } else {
      emptyCart.items.push(currentItem)
      localStorage.setItem("mycart", JSON.stringify(emptyCart))
    }
     
    //setMsg("Product add to cart.")
    alert("Product add to cart.")
    window.location.reload()
  }

  return (
    < >
<div class="container container-fluid">
  <div class="row f-flex justify-content-around">
    <div class="col-12 col-lg-5 img-fluid" id="product_image">
      <img
        src={process.env.PUBLIC_URL + `/images/${product.img}.jpg`}
        alt="img product"
        height="400"
        width="400"
      />
    </div>
    <div class="col-12 col-lg-5 mt-5">
      <h3>{product.pname}</h3>
      <p id="product_id">Product # {product.pid}</p>
      <hr />
      <StarRatings
        rating={product.rate}
        numberOfStars={5}
        starRatedColor="#febd69"
        starDimension={20}
        starSpacing={1}
      />
      <hr />

      <p id="product_price">${product.price}</p>
      
      <hr />
      <h4 class="mt-2">Description:</h4>
      <p>{product.description}</p>
      
      <button
        type="button"
        id="cart_btn"
        class="btn btn-primary d-inline mt-2"
        onClick={btn_addtocart}
      >
        Add to Cart
      </button>
    </div>
  </div>
</div>



    </ >
  );

}

export default Product;
