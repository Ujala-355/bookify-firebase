import React,{useEffect,useState} from "react";
import {useFirebase} from "../context/Firebase";
import CardGroup from "react-bootstrap/CardGroup";
import BookCard from "../component/Card";

const HomePage=()=>{
    const firebase=useFirebase();
    const [books,setBooks]=useState([]);
    useEffect(()=>{
        firebase.listAllBooks().then((books)=> setBooks(books.docs));
    });
    return (
        <>
            <div className="container mt-5">
                <CardGroup>
                {books.map((book)=>(
                    <BookCard key={book.id} {...book.data()}/>
                ))}
                </CardGroup>
            </div>
        </>
    )
}
export default HomePage;