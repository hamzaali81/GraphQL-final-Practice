import React from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';

const GET_BOOKS = gql`
  query GetAllBooks {
    books {
      id
      title
      author
      
    }
  }
`;

const ADD_BOOKS = gql`
  mutation AddBooks($id: Int!, $title: String!, $author: String!) {
    addBook(
      input: {id: $id, author: $author, title: $title}
    ) {
      id
      title
      author
    }
  }
`;


function Book() {
    const { loading, error, data } = useQuery(GET_BOOKS);
    const [addBook] = useMutation(ADD_BOOKS);
    
    console.log(data);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <div>
            <h1>Books Store</h1>
            {data.books.map((el, k)=> 
            <div>
              <h1 key={k}>{el.title}</h1>
              <i key={k}>{el.author}</i>
            </div>
            )}
            <button onClick={()=> addBook({variables:{id: 12,title:'Startup',author: 'Qasim Ali shah'}})}>Add Books</button>
        </div>
    )
}

export default Book;
