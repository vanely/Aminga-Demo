const download = document.querySelector('.download')
const stockData = [
  {
    Symbol: "AAPL",
    Company: "Apple Inc.",
    Price: 132.54,
  },
  {
    Symbol: "INTC",
    Company: "Intel Corporation",
    Price: 33.45,
  },
  {
    Symbol: "GOOG",
    Company: "Google Inc",
    Price: 554.52,
  },
]

/** 
* Formats data in an array of objects into that expectd by a comma delimited csv file.
* @param {Array} data - Array of objects containing data for formatting.
* @return {String} String of comma delimited columns, and new line delimited rows.
*/
function convertArrayOfObjectsToCSV(data) {
  const dataCopy = data || null;
  if (dataCopy == null || !dataCopy.length) {
    return null;
  }

  const columnDelimiter = ",";
  const rowDelimiter =  "\n";

  const keys = Object.keys(dataCopy[0]);

  let result = "";
  // can simplify, and just add comma
  result += keys.join(columnDelimiter);
  // can just concat new like at end
  result += rowDelimiter;

  dataCopy.forEach((item) => {
    let counter = 0;
    // add respective row(values) to every column(key)
    keys.forEach((key) => {
      // add comma after first index
      if (counter > 0) result += columnDelimiter;

      // add row value to column
      result += item[key];
      counter++;
    });
    result += rowDelimiter;
  });

  return result;
}

/** 
* Covert formatted csv data into csv file.
* @param {Array} data - Array of objects containing data for formatting.
* @param {String} filename - Name of output csv file.
*/
function downloadCSV(data, filename) {
  let csv = convertArrayOfObjectsToCSV(data);
  if (!csv) return;

  const file = filename || "export.csv";

  if (!csv.match(/^data:text\/csv/i)) {
    csv = "data:text/csv;charset=utf-8," + csv;
  }
  const encodedData = encodeURI(csv);

  // html portion
  const link = document.createElement("a");
  link.setAttribute("href", encodedData);
  link.setAttribute("download", file);
  link.click();
}
// downloadCSV(stockData);
// console.log("downloadCSV: ");
// console.dir(downloadCSV(stockData));

download.addEventListener('click',(e) => downloadCSV(stockData, 'stock-data'))
