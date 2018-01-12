import express from "express"
import bodyParser from "body-parser"
import { graphqlExpress, graphiqlExpress } from "apollo-server-express"
import { makeExecutableSchema } from "graphql-tools"
import { PeopleSchemaGraphQL } from "../schema/graphqlSchema"
import { RootQuery } from "../resolvers/rootQuery"
const resolvers = RootQuery

// Construct a schema, using GraphQL schema language
const typeDefs = `
  type Query {
    getPeople: [People]
  }
  ${PeopleSchemaGraphQL}`

// Required: Export the GraphQL.js schema object as "schema"
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const myGraphQLSchema = schema, // ... define or import your schema here!
  PORT = 3000,
  app = express()

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
