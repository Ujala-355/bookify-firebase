import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const BookDetailPage = () => {
    const params = useParams();
    const firebase = useFirebase();
    const [data,setData]=useState(null);
    const [url, setURL]=useState(null);
    const [qty,setQty]=useState(1);
    // console.log(params);
    console.log(data);

    useEffect(() => {
        firebase.getBookById(params.bookId).then((value) =>setData(value));
    },[params.bookId]);
    useEffect (()=>{
        if(data){
            const imageURL=data.imageURL;
            firebase.getImageURL(imageURL).then((url)=>setURL(url));
        }
    },[data])

    const placeOrder=async()=>{
        const result=await firebase.placeOrder(params.bookId,qty)
        console.log('Order placed', result);
    }
    
    return (
        <>
            <div className="container mt-5">
                {data && (
                    <>
                        <h1>{data.name}</h1>
                        <img src={url} alt={data.name} width="400px" style={{ borderRadius: "10px" }} />
                        <p>Price: Rs.{data.price}</p>
                        <p>ISBN Number: {data.isbn}</p>
                        <p>Owner Details</p>
                        <p>Name: {data.displayName}</p>
                        <p>Email: {data.userEmail}</p>
                        <Form.Group className="mb-3" controlId="form NUmber">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                        onChange={(e) => setQty(e.target.value)}
                        value={qty}
                        type="Number"
                        placeholder="Enter Quantity"
                        />
                    </Form.Group>
                        <Button onClick={placeOrder}>Buy Now</Button>
                    </>
                )}
            </div>
        </>
    );
};
export default BookDetailPage;


