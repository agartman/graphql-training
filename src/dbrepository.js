import mongoose from "mongoose"

import {
  Schema,
  PlanetSchema,
  StarshipSchema,
  FilmSchema,
  VehicleSchema,
  PeopleSchema,
  SpecieSchema,
  Planet,
  Starship,
  Film,
  Vehicle,
  People,
  Specie
} from "./schema"

const addOrUpdateEntity = (db, entityName, object, schema) => {
    var SchemaModel = db.model(entityName, schema)
    var query = object.name ? { name: object.name } : { title: object.title }
    SchemaModel.findOne(query, function(err, existingEntity) {
      if (existingEntity) {
        existingEntity.set(object)
        existingEntity.save()
        console.log(entityName + " updated:" + existingEntity.name)
      } else {
        var newEntity = new SchemaModel(object)
        newEntity.save(function(err, newEntity) {
          console.log(entityName + " saved:" + newEntity.name)
        })
      }
    })
  },
  addOrUpdateEntities = (db, entityName, entities, schema) =>
    entities.map(entity => addOrUpdateEntity(db, entityName, entity, schema))

export { addOrUpdateEntities }
