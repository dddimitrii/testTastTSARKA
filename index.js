const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const schema = require("./src/graphql/schema");
require("dotenv").config();

const app = express();
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
  })
);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
