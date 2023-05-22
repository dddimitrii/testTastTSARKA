const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const { users, user, posts, post } = require("./queries");
const {
  register,
  login,
  addPost,
  updatePost,
  deletePost,
} = require("./mutations");

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "Queries",
  fields: { users, user, posts, post },
});

const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "Mutations",
  fields: {
    register,
    login,
    addPost,
    updatePost,
    deletePost,
  },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
