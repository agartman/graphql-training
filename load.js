import R from "ramda"
import axios from "axios"
const rooturl = "https://swapi.co/api/"

const getPerson = id => {
  axios
    .get(rooturl + "people/" + id)
    .then(function(response) {
      console.log(response.data)
    })
    .catch(function(error) {
      console.log(error)
    })
}

getPerson(1)
