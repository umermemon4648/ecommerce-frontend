import React,{useState, useEffect} from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../OrdersPage/CheckoutSteps'
import { useSelector, useDispatch} from 'react-redux'
import { creatingOrders, clearErrors} from '../../actions/orderAction'
import {emptyCart} from '../../actions/cartAction'


const Payment = () => {
  const publishableKey = "pk_test_51M3EDcLvaK7iIutswTMranEQXWPAQsPIMVfdTnppjJ82FMa4dQV3vg1ga1rLavLZ4f2bA0L34W89nuRXhLsak7DZ00LwvV86c8"
  
  let history = useNavigate();
  const dispatch = useDispatch()
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const {newUser, loading} = useSelector((state)=> state.user)

  const orderInfo = JSON.parse(sessionStorage.getItem("amountInfo"));

//   const paymentAmount = {
//   amount: Math.round(orderInfo.total * 100),
// };

// sending order data to backend
const order = {
  shippingInfo,
  orderItem: cartItems,
  // paymentInfo: cartItems, //todo
  itemPrice: orderInfo.subTotal,
  taxPrice: orderInfo.tax,
  shippingPrice: orderInfo.shippingCharge,
  totalPrice: orderInfo.total,
  user: newUser._id,
}


  const onToken = async token =>{

    try{
    const config ={headers: {"Content-Type": "application/json"}}
    let data = {
      amount: Math.round(orderInfo.total * 100),
      token,
    }
    let url = "http://localhost:5000/api/payment/process"
        const response = await axios.post(url, data,
          // {token,
          // paymentAmount,},
         config)


          if (response.status ===200) {
            console.log("Payment Id, " , token.card.id )
            order.paymentInfo = {
              id: token.card.id,
              status: "Succeeded"
            }
            console.log(order)
           dispatch(creatingOrders(order))
           history('/order-placed')
           alert("Order placed")
           dispatch(emptyCart())
           sessionStorage.removeItem("amountInfo")
           localStorage.removeItem("ordersInfo")
          }
          else{
            alert("Some error occured")
          }

      } catch (error) {
        
      }
    
    }



// useEffect
useEffect(() => {
  // if (error) {
  //   toast.error(error)
  //   dispatch(clearErrors())
  // }
    // else if(isAuthenticate===true){
    //   history("/")
    // }
  },[dispatch]);

  return (
    <>
    <CheckoutSteps activeStep={2} />

<StripeCheckout
        token={onToken}
        stripeKey={publishableKey}

        // label={"Pay with Credit Card"}
        name={"Pay with Credit Card"}
        // description={""}
        description={`Your total is $${500}`}
        amount={orderInfo.total*100}
        image = {newUser.avatar.url}
        email= {newUser.email}
        // locale= {"kddsa"}
        // panelLabel = {"Pay - "}


      />


    </>
  )
}

export default Payment
