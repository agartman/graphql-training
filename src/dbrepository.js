import mongoose from "mongoose"
mongoose.Promise = global.Promise
import R from "ramda"
import {
  CollectionsEntitiesAndSchemas,
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
  findSchemaByName = propertyName =>
    R.find(R.propEq("entityName", propertyName))(CollectionsEntitiesAndSchemas)
      .schema, //=> for example FilmSchema
  findObjectIdByUrl = (db, url, entityName, propertyName, targetEntityName) => {
    return new Promise((resolve, reject) => {
      var query = Film.where({ url: url })
      query.findOne(function(err, doc) {
        if (err) reject(err)
        if (doc) {
          resolve(doc._id)
          // doc may be null if no document matched
        }
      })
    })
  },
  addOrUpdateEntities = (db, entityName, entities, schema) =>
    entities.map(entity => addOrUpdateEntity(db, entityName, entity, schema)),
  updateRelationsForEntityAndProperty = (
    db,
    targetEntityName,
    targetPropertyName,
    targetSchema,
    referenceEntityName,
    referencePropertyNameOnTarget
  ) => {
    //Find all documents of given entity schema
    var SchemaModel = db.model(targetEntityName, targetSchema)
    SchemaModel.find({}, function(err, existingEntities) {
      //Go through all entities and get data array of the given property from the entity
      existingEntities.map(entity => {
        var existingPropertyArray = R.path([targetPropertyName], entity) //=> for example films

        //If there's items in the array, find the object ids by the given url
        if (existingPropertyArray)
          var promises = existingPropertyArray.map(existingPropertyItem => {
            return findObjectIdByUrl(
              db,
              existingPropertyItem, // this is an url
              targetEntityName,
              targetPropertyName,
              referenceEntityName
            )
          })
        Promise.all(promises).then(objectIds => {
          console.log(objectIds)
          /*entity.set({
            filmReferences: objectIds
          })
          entity.save()*/
        })
      })
    })
  }

export { addOrUpdateEntities, updateRelationsForEntityAndProperty }
