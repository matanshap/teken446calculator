
import React from 'react'
import { Form, Row, Container, Button, Col, Spinner } from 'react-bootstrap'
import PrestressedConcreteContext from './PrestressedConcreteContext'
import { PrestressedConcreteResultsType } from './PrestressedConcrete'
import { ValueField } from '../CustomComponents'
import { FormControl } from 'react-bootstrap'

export const PrestressedConcreteValuesArray = [
  "f_cd",
  "f_pd",
  "d_sp",
  "d_sm",
  "b",
  "A_sm",
  "A_smc",
  "H",
  "A_sp",
  "d_smc",
  "f_sd",
  "M_d"
] as const

const mockData = {
  "f_cd": 21.7,
  "f_pd": 1373.913,
  "d_sp": 7,
  "d_sm": 3,
  "b": 100,
  "A_sm": 15.2,
  "A_smc": 15.2,
  "H": 100,
  "f_sd": 435,
  "A_sp": 7500,
  "d_smc": 3,
  "M_d": 75
}

export type PrestressedConcreteValuesType = typeof PrestressedConcreteValuesArray[number]

export default function PrestressedConcreteForm() {

  const context = React.useContext(PrestressedConcreteContext)
  const formRef = React.useRef<HTMLFormElement>()
  const [isCalculating, setIsCalaulating] = React.useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsCalaulating(true)
    const elements = Array.from(formRef.current.elements) as HTMLInputElement[]
    const data = elements.reduce(
      (acc, curr) => ({...acc, [curr.getAttribute('name')]: Number(curr.value)}), {})
    fetch("http://localhost:5000/PrestressedConcrete", {
      method: "POST",
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(data)
    })
      .then((response) => {
        return response.json()
      })
      .then((json: PrestressedConcreteResultsType) => {
        context.setResults(json)
        context.setAlert({
          variant: "succeess",
          on: true,
          message: "HELLO"
        })
        setIsCalaulating(false)
        console.log(json)
      })
  }

  return (
    <Form onSubmit={handleSubmit} style={{ marginBottom: '50px' }} ref={formRef}>      
      <Row>
        {
          PrestressedConcreteValuesArray.map(value => 
            <ValueField required title={value} value={mockData[value]} key={value} /> 
          )
        }
        <Col xs="12" sm="12" md="12" lg={{span: 6, offset: 0}} style={{margin: 'auto'}}  xl="6"  >
          <Button size="lg" style={{ direction: 'rtl', marginTop: '20px', position: 'relative' }} type="submit" disabled={isCalculating}>
          {
            isCalculating && 
            <div 
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                display: "flex",
                right: 0,
                top: 0,
                alignItems: "center",
                justifyContent: 'center'
              }}
            >
              <Spinner animation="border" />
            </div>
          }
            חישוב
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
