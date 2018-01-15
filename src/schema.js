import mongoose from "mongoose"

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId

const PlanetSchema = new Schema({
    name: String,
    rotation_period: String,
    orbital_period: String,
    diameter: String,
    climate: String,
    gravity: String,
    terrain: String,
    surface_water: String,
    population: String,
    residents: String,
    films: Array,
    created: Date,
    edited: Date,
    url: String
  }),
  FilmSchema = new Schema({
    title: String,
    release_date: Date,
    opening_crawl: String,
    starships: Array,
    vehicles: Array,
    characters: Array,
    producer: String,
    episode_id: Number,
    species: Array,
    director: String,
    planets: Array,
    created: Date,
    edited: Date,
    url: String
  }),
  StarshipSchema = new Schema({
    hyperdrive_rating: { type: String, required: true },
    cargo_capacity: { type: String },
    url: { type: String },
    films: { type: Array },
    created: { type: Date },
    MGLT: { type: String },
    length: { type: String },
    name: { type: String },
    pilots: { type: Array },
    starship_class: { type: String },
    passengers: { type: String },
    cost_in_credits: { type: String },
    model: { type: String },
    manufacturer: { type: String },
    max_atmosphering_speed: { type: String },
    edited: { type: String },
    consumables: { type: String },
    crew: { type: String }
  }),
  SpecieSchema = new Schema({
    eye_colors: { type: String },
    average_lifespan: { type: String },
    hair_colors: { type: String },
    skin_colors: { type: String },
    created: { type: String },
    films: { type: Array },
    language: { type: String },
    homeworld: { type: String },
    edited: { type: String },
    designation: { type: String },
    name: { type: String },
    classification: { type: String },
    url: { type: String },
    people: { type: Array },
    average_height: { type: String }
  }),
  PeopleSchema = new Schema({
    mass: { type: String },
    hair_color: { type: String },
    url: { type: String },
    edited: { type: String },
    created: { type: String },
    films: { type: Array },
    filmReferences: { type: Array },
    eye_color: { type: String },
    height: { type: String },
    gender: { type: String },
    homeworld: { type: String },
    name: { type: String },
    vehicles: { type: Array },
    starships: { type: Array },
    birth_year: { type: String },
    skin_color: { type: String },
    species: {
      type: Array
    }
  }),
  VehicleSchema = new Schema({
    crew: { type: String },
    length: { type: String },
    pilots: { type: Array },
    films: { type: Array },
    passengers: { type: String },
    max_atmosphering_speed: { type: String },
    manufacturer: { type: String },
    edited: { type: String },
    consumables: { type: String },
    url: { type: String },
    model: { type: String },
    created: { type: String },
    name: { type: String },
    cost_in_credits: { type: String },
    vehicle_class: { type: String },
    cargo_capacity: {
      type: String
    }
  })

var Planet = mongoose.model("Planet", PlanetSchema)
var Film = mongoose.model("Film", FilmSchema)
var Starship = mongoose.model("Starship", StarshipSchema)
var Specie = mongoose.model("Specie", SpecieSchema)
var People = mongoose.model("People", PeopleSchema)
var Vehicle = mongoose.model("Vehicle", VehicleSchema)

var CollectionsEntitiesAndSchemas = [
  { entityName: "Film", dbCollectionName: "films", schema: FilmSchema },
  { entityName: "Planet", dbCollectionName: "planets", schema: PlanetSchema },
  {
    entityName: "Vehicle",
    dbCollectionName: "vehicles",
    schema: VehicleSchema
  },
  { entityName: "Specie", dbCollectionName: "species", schema: SpecieSchema },
  { entityName: "People", dbCollectionName: "people", schema: PeopleSchema },
  {
    entityName: "Vehicle",
    dbCollectionName: "starships",
    schema: StarshipSchema
  }
]

export {
  CollectionsEntitiesAndSchemas,
  Schema,
  Planet,
  Film,
  Starship,
  Specie,
  People,
  Vehicle,
  PlanetSchema,
  FilmSchema,
  StarshipSchema,
  SpecieSchema,
  PeopleSchema,
  VehicleSchema
}
