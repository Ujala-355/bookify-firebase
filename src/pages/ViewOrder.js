import React,{useEffect,useState} from "react";
import {useFirebase} from "../context/Firebase";
import BookCard from "../component/Card";
const OrdersPage=()=>{
    const firebase=useFirebase();
    const [books,setBooks]=useState([]);
    useEffect(()=>{
        if(firebase.isLoggedIn)
            firebase.fetchMyBooks().then((books)=>setBooks(books));
    },[firebase]);
    console.log(books)

    if(!firebase.isLoggedIn) return <h1>Please login</h1>;
    return(
        <>
            <div>
                {
                books.map(book=>(
                    <BookCard link={`/books/orders/${book.id}`} key={book.id} id={book.id} {...book}/>
                ))}
                
            </div>
        </>
    )
}
export default OrdersPage;