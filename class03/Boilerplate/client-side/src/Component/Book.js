import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_BOOKS = gql`
  query GetAllBooks {
    books {
      title
      author
      
    }
  }
`;


function Book() {
    const { loading, error, data } = useQuery(GET_BOOKS);
    console.log(data);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <div>
            <h1>Books Store</h1>
            {data.books.map((el, k)=> <h1 key={k}>{el.title}</h1>)}
        </div>
    )
}

export default Book;
