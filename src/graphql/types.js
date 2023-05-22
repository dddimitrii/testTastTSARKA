const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");

const User = require("../../db/models/user");

const UserType = new GraphQLObjectType({
  name: "User",
  description: "User type",
  fields: () => ({
    id: { type: GraphQLID },
    userName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Post type",
  fields: () => ({
    id: { type: GraphQLID },
    userID: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  }),
});

module.exports = { UserType, PostType };
