import DataStore from "nedb-promises"

const database = new DataStore({ filename: "users.db", autoload: true })

export default database;