import firebase from "../firebase";

//TODO  get your collection here 
const db = firebase.collection('Cities')

class CityDataService {

  // get all cities
  getAll() {
    return db
  

  }

  // add new city
  create(city) {
   return   db.add(city)
  }

  //update a value
  update(id, value) {
    return db.doc(id).update(value)
  }
  // delete a city
  delete(id) {
    return db.doc(id).delete()
  }
}

export default new CityDataService();
