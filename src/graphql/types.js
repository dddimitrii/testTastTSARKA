const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");

const User = require("../../db/models/user");

const UserType = new GraphQLObjectType({
  name: "User",
  description: "User type",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Post type",
  fields: () => ({
    id: { type: GraphQLID },
    userID: {
      type: UserType,
      resolve(parent, args) {
        return User.findOne({ where: { id: parent.userID } });
      },
    },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  }),
});

module.exports = { UserType, PostType };
