import React,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {useFirebase} from "../context/Firebase";
const BookCard=(props)=>{
    const firebase=useFirebase();
    const navigate=useNavigate()
    const [url,setURL]=useState(null);
    useEffect(() => {
        const fetchImageURL = async () => {
            try {
                const imageURL = await firebase.getImageURL(props.imageURL);
                setURL(imageURL);
            } catch (error) {
                console.error("Error fetching image URL:", error);
            }
        };

        fetchImageURL();
    }, [firebase, props.imageURL,props.link]);
    console.log(props)
    return(
        <>
            <Card style={{width:"18rem" , margin:"10px"}}>
                {url && <Card.Img variant="top" src={url} />}
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>
                    This book has a title {props.name } and This book is sold by {props.displayName } and this book costs Rs.{props.price}
                    </Card.Text>
                    <Button onClick={e=>navigate(props.link)} variant="primary" >View</Button>
                </Card.Body>
            </Card>
        </>
    )
}
export default BookCard;
