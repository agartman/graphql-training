import { PeopleResolver } from "./peopleResolver"

// Provide resolver functions for your schema fields
const RootQuery = {
  Query: {
    getPeople: () => PeopleResolver
  }
}

export { RootQuery }
