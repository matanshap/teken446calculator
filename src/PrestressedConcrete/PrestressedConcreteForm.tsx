
import React from 'react'
import { Form, Row, Container, Button, Col } from 'react-bootstrap'
import PrestressedConcreteContext from './PrestressedConcreteContext'
import { ValueField } from '../CustomComponents'

export const PrestressedConcreteValuesArray = [
  "f_sd",
  "f_cd",
  "f_pd",
  "A_sp",
  "A_sm",
  "d_sp",
  "d_sm",
  "d_smc",
  "b",
  "A_smc",
  "eps_ud",
  "eps_cu",
  "eps_pe",
  "h"
] as const

export type PrestressedConcreteValuesType = typeof PrestressedConcreteValuesArray[number]

export default function PrestressedConcreteForm() {

  const context = React.useContext(PrestressedConcreteContext)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    fetch("/whatever", {
      method: "POST",
      body: data
    })
      .then(response => response.json())
      .then(json => context.setResults(json))
  }

  return (
    <Form onSubmit={handleSubmit} style={{ marginBottom: '50px' }}>      
      <Row>
        {
          PrestressedConcreteValuesArray.map(value => 
            <ValueField required title={value} /> 
          )
        }
        <Col xs="12" sm="12" md="12" lg={{span: 6, offset: 0}} style={{margin: 'auto'}}  xl="6"  >
          <Button size="lg" style={{ direction: 'rtl', marginTop: '20px' }} type="submit" >חישוב</Button>
        </Col>
      </Row>
    </Form>
  )
}
