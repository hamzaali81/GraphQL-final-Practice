const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./Model/Schema');

const app = express();

app.use(
    '/graphql',
    graphqlHTTP({
      graphiql: true,
      schema
      
    }),
  );
  

const port = 4000;

app.listen(port, ()=>{
    console.log(`Server is ready listen ${port}`)
});

