// NOTE: keep this as very basic implementation.
import { getSportsData, postStudentData } from './api-helpers.js'
import { downloadCSV } from './csv-helpers.js'

// get all data from input elements
const studentSportData = document.querySelectorAll('#student-sport-data input, #student-sport-data select')
const chosenSport = document.querySelector('.chosen-sport')
const basketBallform = document.querySelector('.basket-ball')
const volleyBallform = document.querySelector('.volley-ball')
const handBallform = document.querySelector('.hand-ball')
// reference to submit button
const submit = document.querySelector('.submit')
const generateCSV = document.querySelector('.generate-csv')

chosenSport.addEventListener('change', function(e) {
  console.log(`option changed to: ${chosenSport.value}`)
  if (chosenSport.value === "basketBall") {
    basketBallform.style.display = "block"
    volleyBallform.style.display = "none"
    handBallform.style.display = "none"

  } else if (chosenSport.value === "volleyBall") {
    basketBallform.style.display = "none"
    volleyBallform.style.display = "block"
    handBallform.style.display = "none"  

  } else if (chosenSport.value === "handBall") {
    basketBallform.style.display = "none"
    volleyBallform.style.display = "none"
    handBallform.style.display = "block"  
  }
})

// listen for when form is submitted
submit.addEventListener('click', function(e) {
  // const data = new FormData()
  const data = {}

  for (let field of studentSportData) {
    console.log("form field: ")
    console.dir(field)
    // we don't want the submit, and button inputs, they don't have any data
    if (field.type !== "submit" && field.type !== "button") {
      // data.append(field.name, field.value)
      data[field.name] = field.value
    }
  }

  postStudentData(data)
  // for (let [k, v] of data.entries()) {
  //   console.log(`${k}: ${v}`)
  // }
  console.log('Form Data: ')
  console.log(data)
})

generateCSV.addEventListener('click', function(e) {
  const sportsData = getSportsData()
  console.log("Sports Data: ")
  console.dir(sportsData)
})
