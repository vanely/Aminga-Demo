// import express from 'express'
// import { MongoClient } from 'mongodb'
// import { LowSync, JSONFileSync } from 'lowdb'
// import lodash from 'lodash'
// import cors from 'cors'
const express = require('express')
const { MongoClient } = require('mongodb')
const cors = require('cors')

const app = express()
const port = 3030

// ---------------------------------------------------------- [ MIDDLEWARE ] ----------------------------------------------------------
app.use(cors())
app.use(express.json())

// ---------------------------------------------------------- [ DATABASE ] ----------------------------------------------------------
// const adapter = new JSONFileSync('./db.json')
// const db = new LowSync(adapter)
// db.data = db.data || { sportsData: [] }
// db.chain = lodash.chain(db.data)

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
      if (existingUser.firstName) {
        console.log('user already in database')
        //find and update
        const updatedEntry = await sportsDataCollection.findOneAndUpdate(
          { firstName: studentData.firstName, lastName: studentData.lastName },
          studentData, { new: true }
        )
      }

      const insert = await sportsDataCollection.insertOne(studentData)
    
      console.log('sports data: ')
      console.dir(insert)
      res.status(200).json(JSON.stringify(insert))
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
