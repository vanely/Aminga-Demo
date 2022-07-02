/** 
* Makes request to server for sports-data.
* @return {Object} All previously entered sports data.
*/
export async function getSportsData() {
  const res = await fetch("http://127.0.0.1:3030/sports-data/")
  const data = await res.json()
  return data
}
/** 
* Saves sports data to local database.
* @param {Object} data - Student data to be saved.
* @return {Object} Request status.
*/
export async function postStudentData(data) {
  const res = await fetch("http://127.0.0.1:3030/student-data/", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const resReturn = res.json()
  return resReturn
}
