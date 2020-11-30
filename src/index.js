const { ApolloServer, gql } = require("apollo-server");
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");

const typeDefs = gql`
  scalar Date

  type Query {
    owners: [Owner]
    owner(id: ID): Owner
    sites: [Site]
    site(id: ID): Site
  }

  type Owner {
    id: ID!
    last_name: String!
    first_name: String!
    email: String!
    password: String!
    phone_number: String
  }

  type Site {
    id: ID!
    trout_lake_water: Boolean!
    owners: [Owner]
  }
  
  type PermAddress {
    id: ID!
    address: String!
    city: String!
    state: String!
    zip_code: Int!
    owners: [Owner!]!
  }
  
  type TLAddress {
    id: ID!
    address: String!
    city: String!
    state: String!
    zip_code: Int!
    owners: [Owner!]!
  }
  
  type Bill {
    id: ID!
    year: Int!
    payment: Payment
    payment_due_date: Date!
    sites: [Site!]!
  }
  
  type Payment {
    id: ID!
    paid: Boolean!
    paid_date: Date
    payment_type: String!
    bills: [Bill!]!
  }
`

const arrOfOwners = [
  {
    id: "1",
    last_name: "Tardif",
    first_name: "Peter",
    email: "peter.tardif@gmail.com",
    password: "@tardif4402",
    phone_number: "3033744787"
  },
  {
    id: "2",
    last_name: "Weil",
    first_name: "Maryann",
    email: "weil.maryann@gmail.com",
    password: "tladmin1",
    phone_number: "7202732551"
  }
]

const sites = [
  {
    id: "1",
    trout_lake_water: true,
    owners: [
      {
        id: "1"
      }
    ]
  },
  {
    id: "2",
    trout_lake_water: true,
    owners: [
      {
        id: "2"
      }
    ]
  }
]


const resolvers = {
  Query: {
    owners: () => {
      return arrOfOwners;
    },
    owner: (obj, { id }, context, info) => {
      const foundOwner = arrOfOwners.find(owner => owner.id === id)
      return foundOwner;
    },
    sites: () => {
      return sites;
    },
    site: (obj, { id }, context, info) => {
      console.log("id", id);
      const foundSite = sites.find(site => site.id === id)
      return foundSite;
    }
  },

  Site: {
    owners: (obj, arg, context) => {
      // database call
      const ownerIds = obj.owners.map(owner => owner.id);
      const filteredOwners = arrOfOwners.filter(owner => {
        return ownerIds.includes(owner.id)
      });
      return filteredOwners
    }
  },

  Date: new GraphQLScalarType({
    name: "Date",
    description: "its a date",
    parseValue(value) {
      // value from the client
      return new Date(value)
    },
    serialize(value) {
      // value sent to the client
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }
      return null;
    }
  })
}

const server = new ApolloServer({ typeDefs, resolvers, introspection: true, playground: true });

server.listen({
  port: process.env.PORT || 4000
}).then(({ url }) => {
  console.log(`Server started at ${url}`);
})