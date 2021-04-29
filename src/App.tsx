import React from 'react'
import { Container, Row, Col, Button, Alert, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import useFormFields from './useFormFields'

import ValuesForm from './ValuesForm'


function valuesToCsv(values: any[][]) {
  return "data:text/csv;charset=utf-8," + encodeURI(values.map(e => e.join(",")).join("\r\n"))
} 


function calculateVrdmax(h:number, ds: number, u0: number, fck: number, fcd: number) {
  const d = h - ds
  const res = 0.3 * (1-0.7*(fck/250))*fcd*u0*d
  return res
}

function calculateVrdc(h: number, ds: number, rho: number, cp: number, u0: number, u1: number, fck: number, k: number) {
  const d = h - ds
  const vrdc0 = (((0.12*k*Math.pow(100*rho*0.7*fck, 1/3))*0.1*cp)*u0*d)/100
  const vrdc1 = (((0.12*k*Math.pow(100*rho*0.7*fck, 1/3))*0.1*cp)*u1*d)/100
  return Math.max(vrdc0, vrdc1)
}

function calculateK(d: number) {
  return 1 + (Math.sqrt(200/d))
}


function App() {
  const {formFields, createChangeHandler} = useFormFields({
    h: undefined as number | undefined, ds: undefined as number | undefined, 
    rho: undefined as number | undefined, cp: undefined as number | undefined, 
    u0: undefined as number | undefined, u1: undefined as number | undefined, 
    vdeq: undefined as number | undefined, fck: undefined as number | undefined, 
    fcd: undefined as number | undefined,
  })
  const [validated, setValidated] = React.useState(false)
  const [k, setK] = React.useState(0)
  const [alert, setAlert] = React.useState({message: '', variant: 'danger'})

  function handleCalculate() {
    const {h, ds, rho, cp, u0, u1, vdeq, fck, fcd} = formFields
    if (Object.values(formFields).every(val => typeof val === 'number')) {
      const d = h - ds
      const k = calculateK(d)
      setK(k)
      const vrdc = calculateVrdc(h, ds, rho, cp, u0, u1, fck, k)
      const vrdMax = Math.min(calculateVrdmax(h, ds, u0, fck, fcd), 1.5*vrdc)
      if (vdeq < vrdc) {
        setAlert({message: 'תקין', variant: 'success'})
      } else if (vdeq < vrdMax) {
        setAlert({message: 'זיון לחדירה', variant: 'warning'})
      } else {
        setAlert({message: 'לא ניתן לפתרון', variant: 'danger'})
      }
    } else {

    }
  }

  const exportToCsv = () => {
    const keys = Object.keys(formFields)
    const values = Object.values(formFields) as number[]
    
    const csvData = valuesToCsv([keys, values])
    const a = document.createElement('a')
    a.setAttribute("href", csvData)
    a.setAttribute("download", "my_data.csv")
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleCalculate()

    setValidated(true)
  }

  return (
    <Container as={Row} fluid>
      <Col sm={6} style={{textAlign: 'center', marginTop: '30px'}} >
        <h1>נתונים</h1>
        <Form validated={validated} onSubmit={handleSubmit} style={{marginBottom: '50px'}}>
          <ValuesForm 
            formFields={formFields} 
            createChangeHandler={createChangeHandler as ((key: string) => (e: React.ChangeEvent<HTMLInputElement>) => void)} 
            k={k}
          />
          <Button size="lg" style={{direction: 'rtl', marginTop: '20px'}} type="submit" >חישוב</Button>

        </Form>

        <Button size="lg" style={{direction: 'rtl'}} onClick={exportToCsv} >ייצוא לקובץ Excel</Button>

      </Col>
      <Col sm={6}>
        {alert.message && <Alert style={{textAlign: 'center'}} variant={alert.variant}>
          {alert.message}
        </Alert>}
      </Col>
    </Container>
  );
}

export default App;



