const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Owner {
    id: ID!
    last_name: String!
    first_name: String!
    email: String!
    password: String!
    phone_number: String
  }

  type Query {
    owners: [Owner]
    owner(id: ID): Owner
  }
`

const owners = [
  {
    "id": "1",
    "last_name": "Tardif",
    "first_name": "Peter",
    "email": "peter.tardif@gmail.com",
    "password": "@tardif4402",
    "phone_number": "3033744787"
  },
  {
    "id": 2,
    "last_name": "Weil",
    "first_name": "Maryann",
    "email": "weil.maryann@gmail.com",
    "password": "tladmin1",
    "phone_number": "7202732551"
  }
]

const resolvers = {
  Query: {
    owners: () => {
      return owners;
    },
    owner: (obj, { id }, context, info) => {
      console.log("id", id);
      const foundOwner = owners.find(owner => owner.id === id)
      return foundOwner;
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers, introspection: true, playground: true });

server.listen({
  port: process.env.PORT || 4000
}).then(({ url }) => {
  console.log(`Server started at ${url}`);
})