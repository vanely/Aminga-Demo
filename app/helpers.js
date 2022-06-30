export function func() {
  console.log('imported data from helper module')
  return 'imported module text'
}

export async function request() {
  const res = await fetch("http://127.0.0.1:3030/get-db")
  // .then((res) => {
  //   console.log("initial response: ");
  //   console.dir(res);
  //   return res.text()
  // })
  // .then((data) => {
  //   console.log("extracted data: ");
  //   console.log(data)
  // })
  console.log("initial response: ");
  console.dir(await res.json())
}

// arrayBuffer: ƒ arrayBuffer()
// blob: ƒ blob()
// body: (...)
// bodyUsed: (...)
// clone: ƒ clone()
// formData: ƒ formData()
// headers: (...)
// json: ƒ json()
// ok: (...)
// redirected: (...)
// status: (...)
// statusText: (...)
// text: ƒ text()
// type: (...)
// url: (...)