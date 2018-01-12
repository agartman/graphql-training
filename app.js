import express from "express"
import bodyParser from "body-parser"
import { graphqlExpress, graphiqlExpress } from "apollo-server-express"
import { makeExecutableSchema } from "graphql-tools"

// Construct a schema, using GraphQL schema language
const typeDefs = `
    type Query {
    """
    This operation will say hello to you
    """
    hello: String
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: (root, args, context) => {
      return "Hello world!"
    }
  }
}

// Required: Export the GraphQL.js schema object as "schema"
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const myGraphQLSchema = schema // ... define or import your schema here!
const PORT = 3000

const app = express()

// bodyParser is needed just for POST.
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({ schema: myGraphQLSchema })
)
app.get("/graphiql", graphiqlExpress({ endpointURL: "/graphql" })) // if you want GraphiQL enabled

app.listen(
  PORT,
  console.log(
    `Listening to http://localhost:${PORT}/graphql, instance of GraphiQL running in http://localhost:${PORT}/graphiql`
  )
)
