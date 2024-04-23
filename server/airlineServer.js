const express = require('express')
var mongo = require('mongodb')
var airlinedb = require('./airlineDb')
var cors = require('cors')
var bodyParser = require('body-parser')
var path = require('path')
var expressFileupload = require('express-fileupload');
var session = require('express-session')
const { log, Console } = require('console')
const { lookup } = require('dns')
const { match } = require('assert')
const { ObjectId } = require('mongodb');
const { listeners } = require('process')
var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));
app.use(expressFileupload());

app.use(cors())

app.use(session({
    secret: 'cat',
    resave: false,
    saveUninitialized: true
}))


app.post('/register', async (req, res) => {
    let regData = {
        name: req.body.name,
        Dob: req.body.dob,
        address: req.body.address,
        phone: req.body.phno,

    }

    let logData = {
        email: req.body.email,
        password: req.body.password,
        user_status: req.body.userStatus
    }
    try {
        const db = await airlinedb
        const regResult = await db.collection('registerData').insertOne(regData)
        logData.regId = regResult.insertedId
        await db.collection('loginData').insertOne(logData)
        res.json("success")

    } catch (err) {
        console.error(err)
    }
})

app.post('/login', (req, res) => {
    let logindt = {
        email: req.body.uname,
        password: req.body.upassword
    }

    airlinedb.then((dbase) => {
        return dbase.collection('loginData').findOne({ email: logindt.email }).then((logresult) => {
            // let user=logresult
            console.log(logresult)
            if (logresult) {
                if (logresult.password == logindt.password) {
                    req.session.logresult = logresult

                    if (logresult.user_status == 0) {
                        res.json(logresult)
                    }
                    else if (logresult.user_status == 1) {
                        res.json(logresult)
                    }
                    else if (logresult.user_status == 2) {
                        res.json(logresult)
                    }
                    else {
                        res.json('invalid')
                    }
                } else {
                    res.json('invalid')
                }
            } else {
                res.json('invalid')
            }

        })
    })
})


app.post('/addcompany', async (req, res) => {
    let companyDt = {
        companyName: req.body.companyName,
        companyAddress: req.body.companyAddress,
        companyPh: req.body.companyPh
    }

    let logData = {
        email: req.body.companyEmail,
        password: req.body.companyPassword,
        user_status: req.body.userStatus
    }

    try {
        const db = await airlinedb
        const companyResult = await db.collection('companyDetails').insertOne(companyDt)
        logData.regId = companyResult.insertedId
        await db.collection('loginData').insertOne(logData)
        res.json('success')
    }
    catch (err) {
        console.error(err)
    }
})


app.get('/companyView', async (req, res) => {
    try {
        const dbase = await airlinedb;
        const companyDetails = await dbase.collection('companyDetails').find().toArray();
        const companyId = companyDetails.map(company => company._id);
        const logindatas = await dbase.collection('loginData').aggregate([
            {
                $match: {
                    $and: [{ user_status: 2 }, { regId: { $in: companyId } }]
                }
            },
            {
                "$addFields": { "addData": { "$toObjectId": "$regId" } }
            },
            {
                $lookup: {
                    from: "companyDetails",
                    localField: "addData",
                    foreignField: "_id",
                    as: "newdata"
                }
            },
            { $unwind: "$newdata" }
        ]).toArray();

        // console.log(logindatas);
        res.json({ logindatas, companyDetails });
    } catch (error) {
        console.error(error);

    }
});


// Delete company

app.post('/deleteCompany', (req, res) => {
    const delId = req.body.id;
    airlinedb.then((dbase) => {
        dbase.collection('companyDetails').deleteOne({ _id: new mongo.ObjectId(delId) }).then((result) => {
            dbase.collection('loginData').deleteOne({ regId: new mongo.ObjectId(delId) }).then(() => {
                res.json('deleted successfully')
            })
        })
    })
})

// Find company 
app.post('/findcompany', (req, res) => {
    let findId = req.body.id;
    airlinedb.then(async (dbase) => {
        const company_dt = await dbase.collection('companyDetails').findOne({ _id: new mongo.ObjectId(findId) })
        const login_dt = await dbase.collection('loginData').findOne({ regId: new mongo.ObjectId(findId) })
        res.json({ company_dt, login_dt })
        // console.log(result);
    })
})


// update company


app.post('/updatecompany', async (req, res) => {
    let updateId = req.body.id

    let updatedata = {
        companyName: req.body.companyNames,
        companyAddress: req.body.companyAddresss,
        companyPh: req.body.companyPhs
    }

    let logData = {
        email: req.body.companyEmails,
        // user_status: req.body.userStatus
    }

    
        airlinedb.then((db)=>{
            db.collection('companyDetails').
            updateOne({ _id: new mongo.ObjectId(updateId) }, { $set: updatedata }).then((result)=>{
                db.collection('loginData').
                updateOne({ regId: new mongo.ObjectId(updateId) }, { $set: logData }).then((result)=>{
                    res.json('updated successfully')
                })
            })
        }) 


       
          

    

})

// view company profile

app.post('/companyprofile',(req,res)=>{
    let profileid=req.body.companyid
    let logid=req.body.logid
    airlinedb.then(async(dbase)=>{
    const logindata =await dbase.collection('loginData').findOne({_id:new mongo.ObjectId(logid)})
     const companydata= await dbase.collection('companyDetails').findOne({_id:new mongo.ObjectId(profileid)})
                 console.log(logindata);
            console.log(companydata);

            res.json({logindata,companydata})
        })

         })   

// Add flight
app.post('/addflight',(req,res)=>{
    let flightData={
        flight_Name:req.body.flightName,
        seats:req.body.seats,
        companyId:req.body.companyID

    }
    airlinedb.then((dbase)=>{
        dbase.collection('flight').insertOne(flightData).then((result)=>{
            console.log(result);
        })
    })
})

// view companyflight
app.post('/companyflight',(req,res)=>{   
   let companyiD=req.body.companyId
//    console.log(companyiD);
   airlinedb.then((dbase)=>{
    dbase.collection('flight').find({companyId:companyiD})
    .toArray().then((result)=>{
        // console.log(result);
res.json(result)
    })
   })
})

// dlete flight
app.post('/deleteFlight',(req,res)=>{
    let delId=req.body.id
    airlinedb.then((dbase)=>{
        dbase.collection('flight').deleteOne({_id:new mongo.ObjectId(delId)}).then((result)=>{
            console.log(result);
            res.json('flight deleted')
        })
    })
})
  
// find flight
app.post('/findFlight',(req,res)=>{
    let flightId=req.body.id
    airlinedb.then((dbase)=>{
        dbase.collection('flight').findOne({_id:new mongo.ObjectId(flightId)}).then((result)=>{
            console.log(result);
            res.json(result)
        })
    })
})

// update flight
app.post('/updateFlight',(req,res)=>{
    let flightId=req.body.id
    let newFlight={
        flight_Name:req.body.flightNames,
        seats:req.body.seat,
        // companyId:req.body.companyID
    }
    airlinedb.then((dbase)=>{
        dbase.collection('flight').updateOne({_id:new mongo.ObjectId(flightId)},{$set:newFlight}).then((result)=>{
            console.log(result);
            res.json('flight data updated')
        })
    })
})

// add class
app.post('/addclass',(req,res)=>{
    let classData={
        flight_class:req.body.flightclass,
        companyId:req.body.companyID
    }
    airlinedb.then((dbase)=>{
        dbase.collection('flightClass').insertOne(classData).then((result)=>{
            // console.log(result);
        })
    })
})

// view companyflight
app.post('/viewclass',(req,res)=>{   
    let companyiD=req.body.companyId
 //    console.log(companyiD);
    airlinedb.then((dbase)=>{
     dbase.collection('flightClass').find({companyId:companyiD})
     .toArray().then((result)=>{
        //  console.log(result);
 res.json(result)
     })
    })
 })

 // delete class
app.post('/deleteclass',(req,res)=>{
    let delId=req.body.id
    airlinedb.then((dbase)=>{
        dbase.collection('flightClass').deleteOne({_id:new mongo.ObjectId(delId)}).then((result)=>{
            console.log(result);
            res.json('class deleted')
        })
    })
})

app.post('/findclass',(req,res)=>{
    let classId=req.body.id
    airlinedb.then((dbase)=>{
        dbase.collection('flightClass').findOne({_id:new mongo.ObjectId(classId)}).then((result)=>{
            console.log(result);
            res.json(result)
        })
    })
})

app.post('/updateclass',(req,res)=>{
    let classId=req.body.id
    let Newclass={
        flight_class:req.body.flightcls,
    }

    airlinedb.then((dbase)=>{
        dbase.collection('flightClass').updateOne({_id:new mongo.ObjectId(classId)},{$set:Newclass}).then((result)=>{
            console.log(result);
            res.json('class data updated')
        })
    })
})



    app.post('/addfare',(req,res)=>{
    let fareData={
        flight:req.body.flight,
        flightClass:req.body.classes,
        fare:req.body.fare,
        companyId:req.body.companyID
    }
    airlinedb.then((dbase)=>{
        dbase.collection('fare').insertOne(fareData).then((result)=>{
            console.log(result);
        })
    })
    })

   

app.post('/viewfare', async (req, res) => {
    try {
        const companyId = req.body.companyId;
        const db = await airlinedb; 
        const flightResult = await db.collection('flight').find({ companyId: companyId }).toArray();
        const classResult= await db.collection('flightClass').find({companyId:companyId}).toArray()

        res.json({ flightResult,classResult });
    } catch (error) {
        console.error(error);
    }
});


app.listen(5001)