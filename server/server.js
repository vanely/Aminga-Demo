const express = require('express')
const { MongoClient } = require('mongodb')
const cors = require('cors')
const _ = require('lodash')

const app = express()
const port = 3030

// ---------------------------------------------------------- [ MIDDLEWARE ] ----------------------------------------------------------
app.use(cors())
app.use(express.json())

// ---------------------------------------------------------- [ DATABASE ] ----------------------------------------------------------
const mongoUri = 'mongodb://localhost:27017'
const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })

async function runMongo() {
  try {
    await client.connect()
    const database = client.db('Aminga-Demo')
    const sportsDataCollection = database.collection('sports-data')

    // ---------------------------------------------------------- [ ROUTES ] ----------------------------------------------------------
    app.get('/sports-data', async function (req, res) {
      const sportsData = await sportsDataCollection.find().toArray()

      console.log('jsonDB: ')
      console.dir(sportsData)
      res.status(200).json(sportsData)
    })
    
    app.post('/student-data', async function(req, res) {
      const studentData = req.body
      console.log("req.body - student data: ")
      console.dir(studentData)
      const existingUser = await sportsDataCollection.findOne({firstName: studentData.firstName, lastName: studentData.lastName})
      if (_.get(existingUser, 'firstName', '')) {
        console.log('Updating user in database...')
        //find and update
        const updatedEntry = await sportsDataCollection.findOneAndUpdate(
          { firstName: studentData.firstName, lastName: studentData.lastName },
          { $set: studentData }, { new: true }
        )
        res.status(200).json(JSON.stringify(updatedEntry))
      } else {
        const insert = await sportsDataCollection.insertOne(studentData)
        res.status(200).json(JSON.stringify(insert))
      }
    })

  } finally {
    // client.close()
  }
}

runMongo().catch((err) => console.error(err))

// ---------------------------------------------------------- [ SERVER ] ----------------------------------------------------------
app.listen(port, () => {
  console.log(`Serving on port: ${port}`)
})
