import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'


const Field = (props: {title: JSX.Element, value: number}) => {
  const {title, value} = props
  return (
    <Form.Group as={Row}>
      <Form.Label as={Col} xs="4">
          { title }
      </Form.Label>
      <Col xs="8">
        <Form.Control readOnly  value={value} style={{backgroundColor: 'rgba(255, 255, 255, 0.7)'}} />
      </Col>
    </Form.Group>
  )
}

export default function Results(props: {vrdc: number, vrdMax: number}) {
  return (
    <>
      <Field title={<span>V<sub>rdc</sub></span>} value={props.vrdc} />
      <Field title={<span>V<sub>RDmax</sub></span>} value={props.vrdMax} />
    </>
  )
}