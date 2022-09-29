import React from 'react'
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import Results from "./Results";
import { Teken466ValuesForm } from "../ValuesForm";
import useFormFields from '../useFormFields';
import { FormFields } from "../types"
import { exportToCsv } from '../utils';

export interface Teken466ResultsType {
  vrdc: number,
  vrdMax: number
}

const getFckNumber = (value: string | undefined) => {
  switch(value) {
    case 'ב30':
      return 30
    case 'ב40':
      return 40
    case 'ב50':
      return 50
    default: 
      return undefined
  }
}

const getFcdValue = (value: string | undefined) => {
  switch(value) {
    case 'ב30':
      return 130
    case 'ב40':
      return 175
    case 'ב50':
      return 221
    default: 
      return undefined
  }
}

function calculateVrdmax(h:number, ds: number, u0: number, fck: number, fcd: number) {
  const d = h - ds
  const res = 0.00024 * (1-0.7*(fck/250))*fcd*u0*d
  return res
}

function calculateVrdc(h: number, ds: number, rho: number, cp: number, u0: number, u1: number, fck: number, k: number) {
  const d = h - ds
  let vrdc = (((0.12*k*Math.pow(100*rho*0.7*fck, 1/3))+0.1*cp)*u1*d)/100

  if (vrdc < ((0.035*Math.pow(k, 1.5)*Math.sqrt(0.7*fck)+0.1*cp)*u1*d)/100)
    vrdc = ((0.035*Math.pow(k, 1.5)*Math.sqrt(0.7*fck)+0.1*cp)*u1*d)/100
  return vrdc
}

function calculateK(d: number) {
  return Math.min(1 + (Math.sqrt(20/d)), 2)
}

export default function Teken466() {
  const {formFields, createChangeHandler} = useFormFields<FormFields>({
    h: undefined, ds: undefined, 
    rho: undefined, cp: undefined, 
    u0: undefined, u1: undefined, 
    vdeq: undefined, fck: undefined, 
  })
  const [validated, setValidated] = React.useState(false)
  const [k, setK] = React.useState<number | undefined>(undefined)
  const [fcd, setFcd] = React.useState(getFcdValue(formFields.fck))
  const [results, setResults] = React.useState({vrdc: undefined, vrdMax: undefined})
  const [alert, setAlert] = React.useState({message: '', variant: 'danger'})

  function handleCalculate() {
    const {h, ds, rho, cp, u0, u1, vdeq, fck} = formFields
    if (Object.values(formFields).every(val => val !== undefined)) {
      const d = h - ds
      const k = calculateK(d)
      setK(k)
      const vrdc = calculateVrdc(h, ds, rho / 100, cp, u0, u1, getFckNumber(fck), k)

      const vrdMax = Math.min(calculateVrdmax(h, ds, u0, getFckNumber(fck), fcd), 1.5*vrdc)
      setResults({vrdc, vrdMax})
      if (vdeq < vrdc) {
        setAlert({message: 'תקין', variant: 'success'})
      } else if (vdeq < vrdMax) {
        setAlert({message: 'צריך זיון לחדירה', variant: 'warning'})
      } else {
        setAlert({message: 'לא ניתן לפתרון', variant: 'danger'})
      }
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleCalculate()

    setValidated(true)
  }
  const keys = Object.keys(formFields).concat(Object.keys(results))

  const values = Object.values(formFields).concat(Object.values(results)) as number[]
  return (
    <Container as={Row} fluid style={{margin: 0}}>
      <Col sm={6} style={{ textAlign: 'center', marginTop: '30px' }} >
        <h1>נתונים</h1>
        <Form validated={validated} onSubmit={handleSubmit} style={{ marginBottom: '50px' }}>
          <Teken466ValuesForm
            fcd={fcd}
            formFields={formFields}
            createChangeHandler={createChangeHandler as ((key: string) => (e: React.ChangeEvent<HTMLInputElement>) => void)}
            k={k}
          />
          <Button size="lg" style={{ direction: 'rtl', marginTop: '20px' }} type="submit" >חישוב</Button>
        </Form>
        <Button  
          size="lg" 
          style={{ direction: 'rtl' }} 
          onClick={() => exportToCsv(
            Object.keys(formFields).concat(Object.keys(results)),
            Object.values(formFields).concat(Object.values(results)))} >
            ייצוא לקובץ Excel
          </Button>
      </Col>
      <Col sm={6} style={{ marginTop: '30px', textAlign: 'center' }}>
        <h1>תוצאות</h1>
        {results.vrdMax && <Results />}
        {alert.message && <Alert style={{ textAlign: 'center' }} variant={alert.variant}>
          {alert.message}
        </Alert>}
      </Col>
    </Container>
  )
}
