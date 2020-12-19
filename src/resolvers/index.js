const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");
const { arrOfOwners, sites } = require('../data/index');

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

  Mutation: {
    addSite: (obj, { site }, context) => {
      // database queries go here.
      const newSiteList = [
        ...sites,
        site
        // new movie data goes here
      ];
      // Return data as expected in schema
      return newSiteList
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

module.exports = { resolvers };