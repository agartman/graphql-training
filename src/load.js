require("dotenv").config()

import R from "ramda"
import mongoose from "mongoose"
import { getAPIItemStream } from "./streams"
import { addOrUpdateEntities } from "./dbrepository"
import Kefir from "kefir"
mongoose.Promise = global.Promise

import {
  Schema,
  PlanetSchema,
  StarshipSchema,
  FilmSchema,
  VehicleSchema,
  PeopleSchema,
  SpecieSchema
} from "./schema"

mongoose
  .createConnection(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${
      process.env.DB_HOST
    }`,
    {
      useMongoClient: true
      /* other options */
    }
  )
  .then(db => {
    // log connection errors
    db.on("error", console.error.bind(console, "connection error:"))

    console.log("Got connection to db")
    let concatenatedStreams = Kefir.concat([
      getAPIItemStream("starships").onValue(data => {
        addOrUpdateEntities(db, "Starship", data, StarshipSchema)
      }),
      getAPIItemStream("planets").onValue(data => {
        addOrUpdateEntities(db, "Planet", data, PlanetSchema)
      }),
      getAPIItemStream("films").onValue(data => {
        addOrUpdateEntities(db, "Film", data, FilmSchema)
      }),
      getAPIItemStream("people").onValue(data => {
        addOrUpdateEntities(db, "People", data, PeopleSchema)
      }),
      getAPIItemStream("vehicles").onValue(data => {
        addOrUpdateEntities(db, "Vehicle", data, VehicleSchema)
      }),
      getAPIItemStream("species").onValue(data => {
        addOrUpdateEntities(db, "Specie", data, SpecieSchema)
      })
    ])

    concatenatedStreams.onEnd(() => process.exit()).observe(() => {})
  })
  .catch(err => {
    console.log(err)
  })
//planetsStream.observe(() => {})
