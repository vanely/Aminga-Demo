const express = require('express')
const cors = require('cors')

const port = 3030
const app = express()

// ----------------------------- [ MIDDLEWARE ] -----------------------------
app.use(cors())
app.use(express.json())

// ----------------------------- [ ROUTES ] -----------------------------
app.get('/get-db', function (req, res) {
  res.status(200).json('Message from server')
})

app.post('/student-data', function(req, res) {

})

// ----------------------------- [ SERVER ] -----------------------------
app.listen(port, () => {
  console.log(`Serving on port: ${port}`)
})

// https://medium.com/aeturnuminc/getting-started-with-ngrok-ed67891a74bd