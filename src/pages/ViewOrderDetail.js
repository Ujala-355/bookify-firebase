import React,{useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import {useFirebase} from "../context/Firebase";
const ViewOrderDetails=()=>{
    const params=useParams();
    const firebase=useFirebase();
    const [orders,setOrders]=useState([]);
    useEffect(()=>{
        firebase
        .getOrders(params.bookId)
        .then((orders)=>setOrders(orders.docs))
    },[]);
    return(
        <>
            <div className="container">
                <h1>Orders</h1>
                {
                    orders.map((order)=>{
                        const data=order.data();
                        return(
                            <div key={order.id} className="mt-5" style={{border:"1px solid", padding:"20px"}}>
                                <h4>Order By: {data.displayName}</h4>
                                <h4>Qty:{data.qty}</h4>
                                <h4>Email: {data.userEmail}</h4>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default ViewOrderDetails;