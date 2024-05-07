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


    airlinedb.then((db) => {
        db.collection('companyDetails').
            updateOne({ _id: new mongo.ObjectId(updateId) }, { $set: updatedata }).then((result) => {
                db.collection('loginData').
                    updateOne({ regId: new mongo.ObjectId(updateId) }, { $set: logData }).then((result) => {
                        res.json('updated successfully')
                    })
            })
    })
})

// view company profile

app.post('/companyprofile', (req, res) => {
    let profileid = req.body.companyid
    let logid = req.body.logid
    airlinedb.then(async (dbase) => {
        const logindata = await dbase.collection('loginData').findOne({ _id: new mongo.ObjectId(logid) })
        const companydata = await dbase.collection('companyDetails').findOne({ _id: new mongo.ObjectId(profileid) })
        console.log(logindata);
        console.log(companydata);

        res.json({ logindata, companydata })
    })

})

// Add flight
app.post('/addflight', (req, res) => {
    let flightData = {
        flight_Name: req.body.flightName,
        seats: req.body.seats,
        companyId: req.body.companyID

    }
    airlinedb.then((dbase) => {
        dbase.collection('flight').insertOne(flightData).then((result) => {
            console.log(result);
        })
    })
})

// view companyflight
app.post('/companyflight', (req, res) => {
    let companyiD = req.body.companyId
    //    console.log(companyiD);
    airlinedb.then((dbase) => {
        dbase.collection('flight').find({ companyId: companyiD })
            .toArray().then((result) => {
                // console.log(result);
                res.json(result)
            })
    })
})

// dlete flight
app.post('/deleteFlight', (req, res) => {
    let delId = req.body.id
    airlinedb.then((dbase) => {
        dbase.collection('flight').deleteOne({ _id: new mongo.ObjectId(delId) }).then((result) => {
            console.log(result);
            res.json('flight deleted')
        })
    })
})

// find flight
app.post('/findFlight', (req, res) => {
    let flightId = req.body.id
    airlinedb.then((dbase) => {
        dbase.collection('flight').findOne({ _id: new mongo.ObjectId(flightId) }).then((result) => {
            console.log(result);
            res.json(result)
        })
    })
})

// update flight
app.post('/updateFlight', (req, res) => {
    let flightId = req.body.id
    let newFlight = {
        flight_Name: req.body.flightNames,
        seats: req.body.seat,
        // companyId:req.body.companyID
    }
    airlinedb.then((dbase) => {
        dbase.collection('flight').updateOne({ _id: new mongo.ObjectId(flightId) }, { $set: newFlight }).then((result) => {
            console.log(result);
            res.json('flight data updated')
        })
    })
})

// add class
app.post('/addclass', (req, res) => {
    let classData = {
        flight_class: req.body.flightclass,
        companyId: req.body.companyID
    }
    airlinedb.then((dbase) => {
        dbase.collection('flightClass').insertOne(classData).then((result) => {
            // console.log(result);
        })
    })
})

// view companyflight
app.post('/viewclass', (req, res) => {
    let companyiD = req.body.companyId
    //    console.log(companyiD);
    airlinedb.then((dbase) => {
        dbase.collection('flightClass').find({ companyId: companyiD })
            .toArray().then((result) => {
                //  console.log(result);
                res.json(result)
            })
    })
})

// delete class
app.post('/deleteclass', (req, res) => {
    let delId = req.body.id
    airlinedb.then((dbase) => {
        dbase.collection('flightClass').deleteOne({ _id: new mongo.ObjectId(delId) }).then((result) => {
            console.log(result);
            res.json('class deleted')
        })
    })
})

app.post('/findclass', (req, res) => {
    let classId = req.body.id
    airlinedb.then((dbase) => {
        dbase.collection('flightClass').findOne({ _id: new mongo.ObjectId(classId) }).then((result) => {
            console.log(result);
            res.json(result)
        })
    })
})

app.post('/updateclass', (req, res) => {
    let classId = req.body.id
    let Newclass = {
        flight_class: req.body.flightcls,
    }

    airlinedb.then((dbase) => {
        dbase.collection('flightClass').updateOne({ _id: new mongo.ObjectId(classId) }, { $set: Newclass }).then((result) => {
            console.log(result);
            res.json('class data updated')
        })
    })
})

app.post('/addfare', (req, res) => {
    let fareData = {
        flight: req.body.flight,
        flightClass: req.body.flightClass,
        fare: req.body.fares,
        companyId: req.body.companyID
    }
    airlinedb.then((dbase) => {
        dbase.collection('fare').insertOne(fareData).then((result) => {
            console.log(result);
        })
    })
})


app.post('/viewfare', (req, res) => {

    const companyId = req.body.companyId;
    airlinedb.then(async (db) => {

        const flightResult = await db.collection('flight').find().toArray();
        const classResult = await db.collection('flightClass').find().toArray();
        const fareResult = await db.collection('fare').aggregate([
            {
                $match: {
                    companyId: companyId
                }
            },
            { "$addFields": { "faredts": { "$toObjectId": "$flight" } } },

            {
                $lookup: {
                    from: "flight",
                    localField: "faredts",
                    foreignField: "_id",
                    as: "flightInfo"
                }
            },
            {
                $unwind: "$flightInfo"
            },
            { "$addFields": { "faredt": { "$toObjectId": "$flightClass" } } },

            {
                $lookup: {
                    from: "flightClass",
                    localField: "faredt",
                    foreignField: "_id",
                    as: "classInfo"
                }
            },
            {
                $unwind: "$classInfo"
            }
        ]).toArray();

        // console.log(fareResult);
        res.json({ fareResult, flightResult, classResult });


    })
});

// delete fare
app.post('/deletefare', (req, res) => {
    let delId = req.body.id
    airlinedb.then((dbase) => {
        dbase.collection('fare').deleteOne({ _id: new mongo.ObjectId(delId) }).then((result) => {
            // console.log(result);
            res.json('fare deleted')
        })
    })
})

app.post('/findfare', async (req, res) => {
    let fareId = req.body.id
    try {
        const db = await airlinedb;
        // const flightResult = await db.collection('flight').find({ companyId: companyId }).toArray();
        // const classResult = await db.collection('flightClass').find({ companyId: companyId }).toArray();
        const fareResult = await db.collection('fare').findOne({ _id: new mongo.ObjectId(fareId) }).then((result) => {
            // console.log(fareResult);
            res.json({ fareResult });

        });
    } catch (error) {
        console.error(error);
    }
});



app.post('/addpackage', (req, res) => {
    let packagedt = {
        flight: req.body.flight,
        packages: req.body.pack,
        special: req.body.special,
        price: req.body.price,
        image: req.files.img.name,
        companyId: req.body.companyId
    };

    airlinedb.then((db) => {
        db.collection('package').insertOne(packagedt).then((result) => {
            const filesUp = req.files.img;
            filesUp.mv('./public/images/' + packagedt.image).then(() => {
                res.json("package added");
            })
        })
    })
});


app.post('/viewpackage', (req, res) => {
    const companyId = req.body.companyId

    airlinedb.then(async (db) => {
        const flightResult = await db.collection('flight').find({ companyId: companyId }).toArray()
        const packageResult = await db.collection('package').aggregate([
            { "$addFields": { "packagedt": { "$toObjectId": "$flight" } } },
            {
                $lookup: {
                    from: "flight",
                    localField: "packagedt",
                    foreignField: "_id",
                    as: "newpackdata"
                }
            },
            { $unwind: "$newpackdata" }
        ]).toArray()
        // console.log(packageResult);
        res.json({ flightResult, packageResult })
    })
})

// delete package
app.post('/deletepackage', (req, res) => {
    let delId = req.body.id
    airlinedb.then((dbase) => {
        dbase.collection('package').deleteOne({ _id: new mongo.ObjectId(delId) }).then((result) => {
            // console.log(result);
            res.json('package deleted')
        })
    })
})

// app.post('/findpackage', (req, res) => {
//     let packId = req.body.packid
//     airlinedb.then((dbase) => {
//         dbase.collection('package').findOne({ _id: new mongo.ObjectId(packId) }).then((result) => {
//             console.log(result);
//             res.json(result)
//         })
//     })
// })



app.post('/findpackage', (req, res) => {
    const packId = req.body.packId;
    airlinedb.then((db) => {

        db.collection('package').findOne({ _id: new mongo.ObjectId(packId) })
            .then(result => {
                if (result) {
                    console.log('Package found:', result);
                    res.json(result);
                } else {
                    console.log('Package not found');
                    res.status(404).json({ error: 'Package not found' });
                }
            })

    })
});

// app.post('/updatepackage', (req, res) => {
//     let packId = req.body.id
//     let packData = {
//         flight: req.body.flights,
//         packages: req.body.packs,
//         special: req.body.specials,
//         price: req.body.prices,
//         image: req.files?.imgs.name,
//     }
//     let newValue = ''
//     if (req.files?.imgs) {
//         newValue = {
//             flight: packData.flight,
//             packages: packData.packages,
//             special: packData.special,
//             price: packData.price,
//             image: packData.image
//         }
//         let imgUpdate = req.files.imgs
//         imgUpdate.mv('./public/images/' + updateImage.image)
//     }
//     else {
//         newValue = {
//             flight: packData.flight,
//             packages: packData.packages,
//             special: packData.special,
//             price: packData.price,
//         }
//     }
//     airlinedb.then((dbase) => {
//     dbase.collection('package').updateOne({ _id: new mongo.ObjectId(packId) }, { $set: newValue }).then((result) => {
//         console.log(result);
//         res.json(result)
//     })
// })

// })

app.post('/updatepackage', (req, res) => {
    const packId = req.body.packId;
    const packData = {
        flight: req.body.flight,
        packages: req.body.packages,
        special: req.body.special,
        price: req.body.price,
        image: req.body.image
    };
    airlinedb.then((db) => {

        db.collection('package').updateOne({ _id: new mongo.ObjectId(packId) }, { $set: packData })
            .then(result => {
                console.log(result);
                res.json(result);
            })
    });


})

app.post('/addschedule', (req, res) => {
    const scheduleData = {
        flight: req.body.flight,
        Adate: req.body.Adate,
        Atime: req.body.Atime,
        Ddate: req.body.Ddate,
        Dtime: req.body.Dtime,
        Rdate: req.body.Rdate,
        source: req.body.source,
        destiny: req.body.destiny,
        companyId: req.body.companyId
    };

    airlinedb.then((db) => {
        db.collection('schedule').insertOne(scheduleData)
            .then(result => {
                console.log(result);
                res.json('Flight scheduled');
            })
    })

});


app.post('/viewschedule', (req, res) => {

    const companyId = req.body.companyId;
    airlinedb.then(async (db) => {

        const flightResult = await db.collection('flight').find().toArray();
        const scheduleResult = await db.collection('schedule').aggregate([
            {
                $match: {
                    companyId: companyId
                }
            },
            { "$addFields": { "scheduledts": { "$toObjectId": "$flight" } } },

            {
                $lookup: {
                    from: "flight",
                    localField: "scheduledts",
                    foreignField: "_id",
                    as: "scheduleInfo"
                }
            },
            {
                $unwind: "$scheduleInfo"
            }
        ]).toArray();

        console.log(scheduleResult);
        res.json({ scheduleResult, flightResult });


    })
});


app.post('/deleteschedule', (req, res) => {
    let delId = req.body.id
    airlinedb.then((dbase) => {
        dbase.collection('schedule').deleteOne({ _id: new mongo.ObjectId(delId) }).then((result) => {
            // console.log(result);
            res.json('Schedule deleted')
        })
    })
})

app.post('/findschedule', (req, res) => {
    let scheduleId = req.body.id
    airlinedb.then((dbase) => {
        dbase.collection('schedule').findOne({ _id: new mongo.ObjectId(scheduleId) }).then((result) => {
            // console.log(result);
            res.json(result)
        })
    })
})

app.post('/updateschedule', (req, res) => {
    let scheduleId = req.body.id
    const scheduleData = {
        // flight: req.body.flight,
        Adate: req.body.Adates,
        Atime: req.body.Atimes,
        Ddate: req.body.Ddates,
        Dtime: req.body.Dtimes,
        Rdate: req.body.Rdates,
        source: req.body.sources,
        destiny: req.body.destinys,
        // companyId: req.body.companyId
    };

    airlinedb.then((db) => {
        db.collection('schedule').updateOne({ _id: new mongo.ObjectId(scheduleId) }, { $set: scheduleData })
            .then(result => {
                console.log(result);
                res.json(result);
            })
    })

});

// app.post('/flightsview', (req, res) => {
//     let userId = req.body.userId;
//     let source = req.body.source;
//     let destiny = req.body.destiny;

//     airlinedb.then(async (db) => {
//         const flightResult = await db.collection('flight').find().toArray();
//         const fareResult = await db.collection('fare').find().toArray()
//         const scheduleResult = await db.collection('schedule').aggregate([
//             {
//                 $match: {
//                     source: source, 
//                     destiny: destiny 
//                 }
//             },
//             { "$addFields": { "scheduledts": { "$toObjectId": "$flight" } } },

//             {
//                 $lookup: {
//                     from: "flight",
//                     localField: "scheduledts",
//                     foreignField: "_id",
//                     as: "flightInfo"
//                 }
//             },
//             {
//                 $unwind: "$flightInfo"
//             },
//             { "$addFields": { "faredt": { "$toObjectId": "$flight" } } },
//             {

//                     $lookup: {
//                         from: "fare",
//                         localField: "faredt",
//                         foreignField: "_id",
//                         as: "fareInfo"
//                     }


//             },
//             {
//                 $unwind: "$fareInfo"
//             },
//         ]).toArray()
//         console.log(scheduleResult);
//                 res.json({flightResult,fareResult,scheduleResult});


//     });
// });

app.post('/flightsview', async (req, res) => {
    try {
        const { source, destiny, userId } = req.body;

        const db = await airlinedb;

        // Fetch schedule results
        const scheduleResult = await db.collection('schedule').aggregate([
            {
                $match: {
                    source: source,
                    destiny: destiny
                }
            },
            {
                $lookup: {
                    from: "flight",
                    localField: "flight",
                    foreignField: "_id",
                    as: "flightInfo"
                }
            },
            {
                $unwind: "$flightInfo"
            }
        ]).toArray();

        // Extract flight IDs from scheduleResult
        const flightIds = scheduleResult.map(schedule => schedule.flightInfo._id);

        console.log("Flight IDs:", flightIds);

        // Fetch fare results without $match stage temporarily
        const fareResult = await db.collection('fare').aggregate([
            {
                $match: {
                    flight: { $in: flightIds }
                }
            },
            {
                $lookup: {
                    from: "flight",
                    localField: "flight",
                    foreignField: "_id",
                    as: "fareFlightInfo"
                }
            },
            {
                $unwind: "$fareFlightInfo"
            }
        ]).toArray();

        console.log("Fare Results:", fareResult);

        res.json({ scheduleResult, fareResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



























app.listen(5001)