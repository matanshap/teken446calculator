import React, { useState, useReducer } from 'react'
import { Form, Col, Row, Container, InputGroup, Button } from "react-bootstrap"
import './ValuesForm.css'

interface ValueFieldProps {
  required: boolean
  value: number,
  children?: any, 
  text?: string, 
  end?: string, 
  readOnly?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function ValueField(props: ValueFieldProps): JSX.Element {
  return (
    <Col xs="12" sm="12" md="12" lg={{span: 6, offset: 0}} style={{margin: 'auto'}}  xl="6"  >
      <Form.Group as={Row} >
        <Col xs={{span: 4}}>
          <Row>
            <Col xs="8" style={{ padding: '0 5px 0 0'}}>
              <Form.Text style={{direction: 'rtl', lineHeight: 1}} >{props.text}</Form.Text>
            </Col>
            <Col xs="4" style={{flexBasis: 0, padding: 0}} >
              <Form.Label style={{whiteSpace: 'nowrap'}} >
                { props.children }
              </Form.Label>
            </Col>
          </Row>
        </Col>
        <Col 
          xs={{span: 8, offset: 0}}
        >
          <InputGroup>
            <Form.Control 
              required={props.required}
              readOnly={props.readOnly} 
              type="number" 
              onChange={props.onChange || (() => {})} 
              value={props.value || ''}
              style={{backgroundColor: 'rgba(255, 255, 255, 0.7)'}}
            />
            {props.end && <InputGroup.Append>
              <InputGroup.Text>{props.end}</InputGroup.Text>
            </InputGroup.Append>}
          </InputGroup>
        </Col>
      </Form.Group>
    </Col>
  )
}

type ValuesFormProps = {
  k: number, 
  formFields: {[x: string]: number}, 
  createChangeHandler: (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ValuesForm(props: ValuesFormProps) {
  const {formFields, createChangeHandler} = props
  return (
    <Row as={Container} fluid>
      <ValueField required value={formFields.h} text="עובי אלמנט" end="cm" onChange={createChangeHandler('h')} >
        H
      </ValueField>
      <ValueField required value={formFields.fck} text="החוזק האופייני"  onChange={createChangeHandler('fck')} >
        F<sub>ck</sub>
      </ValueField>
      <ValueField required value={formFields.fcd} text="חוזק התכן" onChange={createChangeHandler('fcd')} >
        F<sub>cd</sub>
      </ValueField>
      {/* <div className="marginClass" /> */}
      <ValueField  required value={formFields.ds} onChange={createChangeHandler('ds')} text="שכבת כיסוי בטון" end="cm" >
        ds
      </ValueField>
      <ValueField  required value={formFields.rho} onChange={createChangeHandler('rho')} text="אחוז הזיון" end="%">
        &rho;
      </ValueField>
      {/* <div className="marginClass" /> */}
      <ValueField  required value={formFields.cp} onChange={createChangeHandler('cp')} text="אם יש דריכה">
        C<sub>p</sub>
      </ValueField>
      <ValueField required  value={formFields.u0} onChange={createChangeHandler('u0')} >
        u<sub>0</sub>
      </ValueField>
      {/* <div className="marginClass" /> */}
      <ValueField  required value={formFields.u1} onChange={createChangeHandler('u1')} >
        u<sub>1</sub>
      </ValueField>
      <ValueField  required value={formFields.vdeq} onChange={createChangeHandler('vdeq')} >
        V<sub>deq</sub>
      </ValueField>
      {/* <div className="marginClass" /> */}
      <ValueField  required value={props.k} readOnly>
        K<sub>1</sub>
      </ValueField>
    </Row>
  )
}
