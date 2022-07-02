import express from 'express'
import { Low, JSONFile } from 'lowdb'
import cors from 'cors'

const app = express()
const port = 3030

// ---------------------------------------------------------- [ DATABASE ] ----------------------------------------------------------
const adapter = new JSONFile('./db.json')
const db = new Low(adapter)
db.read()

db.data = db.data || { sportsData: [] }

// ---------------------------------------------------------- [ MIDDLEWARE ] ----------------------------------------------------------
app.use(cors())
app.use(express.json())

// ---------------------------------------------------------- [ ROUTES ] ----------------------------------------------------------
app.get('/sports-data', function (req, res) {
  const { sportsData } = db.data
  const data = sportsData
  
  res.status(200).json(data)
})

app.post('/student-data', function(req, res) {
  const { sportsData } = db.data
  const studentData = sportsData.push(req.body)
  console.log('request body: ')
  console.dir(req.body)
  db.write()
  
  res.status(200).json(JSON.stringify(studentData))
})

// ---------------------------------------------------------- [ SERVER ] ----------------------------------------------------------
app.listen(port, () => {
  console.log(`Serving on port: ${port}`)
})

// https://medium.com/aeturnuminc/getting-started-with-ngrok-ed67891a74bd