/** 
* Formats data in an array of objects into that expectd by a comma delimited csv file.
* @param {Array} data - Array of objects containing data for formatting.
* @return {String} String of comma delimited columns, and new line delimited rows.
*/
function formatStudentDataToCSV(data) {
  const dataCopy = data || null;
  if (dataCopy == null || !dataCopy.length) {
    return null
  }

  const columnDelimiter = ","
  const rowDelimiter = "\n"

  // get difference of all keys
  // const allKeys = [] 
  // dataCopy.forEach(function(obj) {
  //   allKeys.push(Object.keys(obj))
  // })
  // const uniqueKeys = [...new Set(allKeys)]
  
  // get last object's keys
  const keys = Object.keys(dataCopy[dataCopy.length - 1])

  let result = ""
  // comma separate object keys to later be interpreted as columns in csv
  result += keys.join(columnDelimiter)
  // can just concat new like at end
  result += rowDelimiter

  dataCopy.forEach(function(item) {
    let counter = 0
    // add respective row(values) to every column(key)
    keys.forEach((key) => {
      // add comma after first index
      if (counter > 0) result += columnDelimiter

      // add row value to column
      result += item[key]
      counter++
    })
    result += rowDelimiter
  })

  return result
}

/** 
* Covert formatted csv data into csv file.
* @param {Array} data - Array of objects containing data for formatting.
* @param {String} filename - Name of output csv file.
*/
export function downloadCSV(data, filename) {
  let csv = formatStudentDataToCSV(data)
  if (!csv) return

  const file = filename || "sports-data.csv"

  if (!csv.match(/^data:text\/csv/i)) {
    csv = "data:text/csv;charset=utf-8," + csv
  }
  const encodedData = encodeURI(csv)

  // data download
  const link = document.createElement("a")
  link.setAttribute("href", encodedData)
  link.setAttribute("download", file)
  link.click()
}
