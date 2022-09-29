export function exportToCsv(keys: string[], values: any[]) {
  /* const keys = Object.keys(formFields).concat(Object.keys(results))

  const values = Object.values(formFields).concat(Object.values(results)) as number[] */
  function valuesToCsv(values: any[][]) {
    return "data:text/csv;charset=utf-8," + encodeURI(values.map(e => e.join(",")).join("\r\n"))
  } 
  const csvData = valuesToCsv([keys, values])
  
  const a = document.createElement('a')
  a.setAttribute("href", csvData)
  a.setAttribute("download", "my_data.csv")
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
