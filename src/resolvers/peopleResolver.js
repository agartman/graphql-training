// at the top with imports:
import Mongoose from "mongoose"

// somewhere in the middle:
Mongoose.Promise = global.Promise

const mongo = Mongoose.connect("mongodb://localhost/People", {
  useMongoClient: true
})

const Peoplechema = Mongoose.Schema({
  postId: Number,
  People: Number
})

const People = Mongoose.model("People", Peoplechema)

// at the bottom, add Peopleto the exports
export { Author, Post, People }
