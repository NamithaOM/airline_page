const MongoClient=require('mongodb').MongoClient
const client = new MongoClient('mongodb://localhost:27017')
function database(){

    return client.connect().then((dbase)=>{
        var airline=dbase.db('airlineData')
        return airline
    })
}
module.exports= database()