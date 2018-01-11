import axios from "axios"
import Kefir from "kefir"
const rooturl = "https://swapi.co/api"

const getPagedEntities = async (entityName, page) =>
    await axios.get(`${rooturl}/${entityName}?page=${page}`),
  getPollingStream = () => {
    let page = 1
    return Kefir.fromPoll(3000, () => page++)
  },
  getAPIItemStream = entityName => {
    /*
    Creating a observable, that increments the pagenumber, with a time interval.

    Attaching a handler with an emitter to a stream of the pagenumber observable.

    Once the API gives us a 404, meaning there are no more data, we'll end the stream and call the given callback.
    */
    return getPollingStream().withHandler((emitter, event) => {
      if (event.type === "value") {
        getPagedEntities(entityName, event.value)
          .then(data => {
            if (data && data.data.results) {
              emitter.value(data.data.results)
            } else emitter.end()
          })
          .catch(err => {
            if (err.response && err.response.status === 404) emitter.end()
          })
      } else {
        console.log(event)
      }
    })
  }

export { getAPIItemStream }
