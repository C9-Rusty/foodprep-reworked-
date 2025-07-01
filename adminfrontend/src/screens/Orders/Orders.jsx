
import {useState,useEffect} from 'react'
import './Orders.css'
import axios from 'axios'
import {toast} from 'react-toastify'
import {assets} from '../../assets/assets'
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Orders = ({url}) => {
  const navigate = useNavigate();
  const { token, admin } = useContext(StoreContext);

  const [orders,setOrders] = useState([])

  const statusHandler = async(e,orderId)=>{
    try {
      const response = await axios.post(url+"/api/order/status",{orderId,status:e.target.value})
      fetchAllOrders()
    } catch (error) {
      console.log(error)
    }
  }

  const fetchAllOrders = async()=>{
    try {
      const response = await axios.get(url+'/api/order/list')
      setOrders(response.data.data)
    } catch (error) {
      toast.error("Error")
    }
  }

  useEffect(() => {
    if (!admin && !token) {
      toast.error("Please Login First");
      navigate("/");
    }
    fetchAllOrders();
  }, []);

  return (
    <div className='orders screen'>
      <h3>Order Page</h3>
      {!orders.length && <> <br></br> <p> No Orders found </p> </> }
      <div className="orders-list">
        {orders.map((order,index)=>(
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item,itemIndex)=>{
                  if(itemIndex===order.items.length-1)
                    return item.name + "\u00A0x\u00A0" +item.quantity 
                  else
                    return item.name + "\u00A0x\u00A0" +item.quantity +", "
                })}
              </p>
              <p className='order-item-name'>{order.address.first_name+" "+order.address.first_name}</p>
              <div className="order-item-address">
                <p>{order.address.street}</p>
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zip_code}</p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>{order.amount}</p>
            <select onChange={(e)=>statusHandler(e,order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
