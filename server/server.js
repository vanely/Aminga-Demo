const express = require('express')
const {LowSync, JSONFileSync} = require('lowdb/lib')
// const FileSync = require('lowdb/adapters/FileSync')
const cors = require('cors')
const app = express()

const port = 3030

// ----------------------------- [ DATABASE ] -----------------------------
// const db = lowdb(new FileSync('db.json'))
// db.defaults({ sportsData: [] }).write()

// ----------------------------- [ MIDDLEWARE ] -----------------------------
app.use(cors())
app.use(express.json())

// ----------------------------- [ ROUTES ] -----------------------------
app.get('/sports-data', function (req, res) {
  // const data = db.get('sportsData').value()
  const data = ''
  
  res.status(200).json(data)
})

app.post('/student-data', function(req, res) {
  const studentData = req.body
  // db.get('sportsData').push({...studentData}).write()
  
  res.status(200).json({ success: true })
})

// ----------------------------- [ SERVER ] -----------------------------
app.listen(port, () => {
  console.log(`Serving on port: ${port}`)
})

// https://medium.com/aeturnuminc/getting-started-with-ngrok-ed67891a74bd