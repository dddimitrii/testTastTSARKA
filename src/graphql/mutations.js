const { PostType, CommentType } = require("./types")
const { User, Post } = require("../../db/models")
const { GraphQLString } = require("graphql")
const bcrypt = require("bcrypt")

const { createJwtToken } = require("../util/auth")

const register = {
  type: GraphQLString,
  description: "Register new user",
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const { username, email, password } = args
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({ userName: username, email, password: hashedPassword })

    const token = createJwtToken(user)
    return token
  },
}

const login = {
  type: GraphQLString,
  description: "Login user",
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const user = await User.findOne({ where: { email: args.email } })
    const doesPasswordMatch = await bcrypt.compare(args.password, user.password)
    if (!user || !doesPasswordMatch) {
      throw new Error("Invalid credentials")
    }

    const token = createJwtToken(user)
    return token
  },
}

const addPost = {
  type: PostType,
  description: "Create new blog post",
  args: {
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  async resolve(parent, args, { verifiedUser }) {
    console.log("Verified User: ", verifiedUser)
    if (!verifiedUser) {
      throw new Error("Unauthorized")
    }

    const post = await Post.create({
      userID: verifiedUser._id,
      title: args.title,
      body: args.body,
    })

    return post
  },
}

module.exports={register, login}

