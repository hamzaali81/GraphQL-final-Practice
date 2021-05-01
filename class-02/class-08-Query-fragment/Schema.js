// Schema fully connected of our data we go from companies to user
// Query in Schema fragment process
const graphql = require('graphql');
const axios = require('axios');
var _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList

} = graphql;


const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: ()=> ({
        id: {type: GraphQLString },
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        // This method is not use messy way
        // users: {
        //     type: UserType,
        //     resolve(parentValue, args){
        //     return axios.get(`http://localhost:3000/companies/${parentValue}`)
        //     }
        // }
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)

                .then((response)=> response.data)
            }
        }

    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields:()=> ({
        id: { type:  GraphQLString},
        firstName: {type: GraphQLString},
        age: {type: GraphQLInt},
        company: {
            type: CompanyType,
            resolve(parentValue, args) {
                // Resolve Nested Relation 
                // console.log(parentValue, args);
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                .then((response) => response.data)
            }
        }
    })
});


// const users = [
//     {id: '23', firstName: 'hamza', age: 21},
//     {id: '24', firstName: 'ali', age: 22}
// ]

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',

    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},
            resolve(parentValue, args) {
                // we go into our database and we find the actual data 
                // that we are looking for another way of looking
                // holding our data        
                // return _.find(users, { id: args.id })
                return axios.get(`http://localhost:3000/users/${args.id}`)
                            .then((response)=> response.data)
                            // .then((data)=> data)
            }
        },
        
        company: {
            type: CompanyType,
            args: {id: {type: GraphQLString}},
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/companies/${args.id}`)
                .then((response)=> response.data)
            }
        }
    }
    });


module.exports = new GraphQLSchema({
    query: RootQuery
});

// GraphQL GUI
// {
//     user(id :"50") {
//        firstName  
//        company { 
//         id
//       }
//   }
//   }


// GraphQL GUI

// {
//     company(id: "1"){
//       name
//     }
//   }




// {
//     company(id: "1"){
//       name
//       users{
//         id
//         firstName
//         company{
//           id
//         }
//       }
//     }
//   }


// Dislike way 
// {
//     apple:company(id: "1"){
//      id
//      name
//     }
//      google:company(id: "2"){
//      id
//      name
//     }
//   }

// Fragment Challenge Resolve
// {
//     apple:company(id: "1"){
//      ...companyDetails
//     }
//      google:company(id: "2"){
//      ...companyDetails
//     }
//   }
  
//   fragment companyDetails on Company {
//     id
//     name
//     description
//   }