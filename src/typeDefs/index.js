const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type Query {
    owners: [Owner]
    owner(id: ID): Owner
    sites: [Site]
    site(id: ID): Site
  }

  input OwnerInput {
    id: ID
  }

  input SiteInput {
    id: ID
    trout_lake_water: Boolean
    owners: [OwnerInput]
  }

  type Mutation {
    addSite(site: SiteInput): [Site]
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

module.exports = { typeDefs };