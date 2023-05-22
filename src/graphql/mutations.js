const { PostType, CommentType } = require("./types");
const { User, Post } = require("../../db/models");
const { GraphQLString } = require("graphql");
const bcrypt = require("bcrypt");

const { createJwtToken } = require("../util/auth");

const register = {
  type: GraphQLString,
  description: "Register new user",
  args: {
    userName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const { userName, email, password } = args;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    const token = createJwtToken(user);
    return token;
  },
};

const login = {
  type: GraphQLString,
  description: "Login user",
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const user = await User.findOne({ where: { email: args.email } });
    const doesPasswordMatch = await bcrypt.compare(
      args.password,
      user.password
    );
    if (!user || !doesPasswordMatch) {
      throw new Error("Invalid credentials");
    }

    const token = createJwtToken(user);
    return token;
  },
};

const addPost = {
  type: PostType,
  description: "Create new blog post",
  args: {
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  async resolve(parent, args, { verifiedUser }) {
    if (!verifiedUser) {
      throw new Error("Unauthorized");
    }

    const post = await Post.create({
      userID: verifiedUser.id,
      title: args.title,
      body: args.body,
    });

    return post;
  },
};

const updatePost = {
  type: PostType,
  description: "Update blog post",
  args: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  async resolve(parent, args, { verifiedUser }) {
    if (!verifiedUser) {
      throw new Error("Unauthenticated");
    }
    const postToUpdate = await Post.update(
      { title: args.title, body: args.body },
      { where: { id: args.id } }
    );

    if (!postToUpdate) {
      throw new Error("No post with the given ID found for the author");
    }
    const updatedPost = await Post.findOne({ where: { id: args.id } });
    return updatedPost;
  },
};

const deletePost = {
  type: GraphQLString,
  description: "Delete post",
  args: {
    id: { type: GraphQLString },
  },
  async resolve(parent, args, { verifiedUser }) {
    console.log(verifiedUser);
    if (!verifiedUser) {
      throw new Error("Unauthenticated");
    }
    const postDeleted = await Post.destroy({ where: { id: args.id } });
    console.log(postDeleted);
    if (!postDeleted) {
      throw new Error("No post with the given ID found for the author");
    }

    return "Post deleted";
  },
};

module.exports = { register, login, addPost, updatePost, deletePost };
