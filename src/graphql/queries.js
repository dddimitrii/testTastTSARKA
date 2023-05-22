const { GraphQLList, GraphQLID } = require("graphql");
const { UserType, PostType } = require("./types");
const { User, Post } = require("../../db/models");

const users = {
  type: new GraphQLList(UserType),
  description: "Retrieves list of users",
  async resolve(parent, args) {
    return await User.findAll();
  },
};

const user = {
  type: UserType,
  description: "Retrieves one user",
  args: { id: { type: GraphQLID } },

  resolve(parent, args) {
    return User.findOne({ where: { id: args.id } });
  },
};

const posts = {
  type: new GraphQLList(PostType),
  description: "Retrieves list of posts",
  resolve() {
    return Post.findAll();
  },
};

const post = {
  type: PostType,
  description: "Retrieves one post",
  args: { id: { type: GraphQLID } },
  resolve(_, args) {
    return Post.findOne({ where: { id: args.id } });
  },
};

module.exports = { users, user, posts, post };
