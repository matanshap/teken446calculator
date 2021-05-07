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

export default function Results(props: {vrdc0: number, vrdc1: number, vrdMax: number}) {
  return (
    <>
        <Field title={<span>vrdc<sub>0</sub></span>} value={props.vrdc0} />

      <Field title={<span>vrdc<sub>1</sub></span>} value={props.vrdc1} />
      <Field title={<span>vrd<sub>max</sub></span>} value={props.vrdMax} />

    </>

  )
}