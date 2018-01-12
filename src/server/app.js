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
    getPeople: [People]
  }

  type People{
    mass: String,
    hair_color: String,
    url: String,
    edited: String,
    created: String,
    films: [String],
    eye_color: String,
    height: String,
    gender: String,
    homeworld: String,
    name: String,
    vehicles: [String],
    starships: [String],
    birth_year: String,
    skin_color: String,
    species: [String]
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!",
    getPeople: () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("MyPromise")
        }, 2000)
      })
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
