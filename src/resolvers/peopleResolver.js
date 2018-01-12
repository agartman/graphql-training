import { People } from "../schema/mongoSchema"
export const PeopleResolver = People.find().then(people => people)
