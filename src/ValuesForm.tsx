import React, { useState, useReducer } from 'react'
import { Form, Col, Row, Container, InputGroup, Button } from "react-bootstrap"
import './ValuesForm.css'
import {FormFields} from './types'


interface ValueFieldProps {
  required: boolean
  value?: number,
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
        <Col xs={{span: 4}} style={{flexWrap: 'nowrap'}} >
          <Row >
            <Col xs="8" style={{ padding: '0 5px 0 0'}}>
              <Form.Text style={{direction: 'rtl', lineHeight: 1}} >{props.text}</Form.Text>
            </Col>
            <Col xs="4" >
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
              value={typeof props.value === 'number' ? props.value : ''}
              style={{backgroundColor: 'rgba(255, 255, 255, 0.7)'}}
              step="any"
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

interface SelectFieldProps extends React.HTMLProps<HTMLInputElement> {
  fieldTitle: string | JSX.Element, 
  options: any[],
  value: any,
  readOnly?: boolean
}

function SelectField(props: SelectFieldProps) {
  console.log(props)
  return (
    <Col xs="12" sm="12" md="12" lg={{span: 6, offset: 0}} style={{margin: 'auto'}}  xl="6">
      <Form.Group as={Row}>
        <Col xs="4">
          <Row>
            <Col xs={{offset: 8}}>
              <Form.Label>
                {props.fieldTitle}
              </Form.Label>
            </Col>
          </Row>
        </Col>
        <Col xs="8">
          <Form.Control 
            required 
            readOnly={props.readOnly} 
            onChange={props.onChange as () => string} 
            value={props.value} 
            as="select" 
            custom
            style={{backgroundColor: 'rgba(255, 255, 255, 0.7)'}}
          >
            <option style={{display: 'none'}} value='' />
            {props.options.map(optionValue => <option key={optionValue} value={optionValue}>{optionValue}</option>)}
          </Form.Control>
        </Col>
      </Form.Group>
    </Col>
  )
}


type ValuesFormProps = {
  k: number, 
  fcd: number,
  formFields: FormFields, 
  createChangeHandler: (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => void
}


export function Teken466ValuesForm(props: ValuesFormProps) {
  const {formFields, createChangeHandler} = props
  return (
    <Row>
      <ValueField required value={formFields.h} text="עובי אלמנט" end="cm" onChange={createChangeHandler('h')} >
        H
      </ValueField>
      {/* <ValueField required value={formFields.fck} text="החוזק האופייני"  onChange={createChangeHandler('fck')} >
        F<sub>ck</sub>
      </ValueField> */}
      <SelectField 
        placeholder="חוזק אופייני"
        fieldTitle={<span>F<sub>ck</sub></span>} 
        options={['ב30', 'ב40', 'ב50']} 
        value={formFields.fck || ''}
        onChange={createChangeHandler('fck')} 
      />

      <ValueField required value={props.fcd} text="חוזק התכן" readOnly >
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


const prestressedConcreteValuesArray = [
  "C_all",
  "A_c",
  "C_ult",
  "C_usmc",
  "x",
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
  "T_sall",
  "T_ult",
  "T_usm",
  "eps_ud",
  "eps_cu",
  "eps_pe"
]

function createName(name: string) {
  const arr = name.split('_')
  if (arr.length == 1) return <>{arr[0]}</>
  if (arr[0] == 'eps') return <>&epsilon; <sub>{arr[1]}</sub></>
  return <>{arr[0]}<sub>{arr[1]}</sub></>
}

export function PrestressedConcreteValuesForm() {

  const handleSubmit = () => {

  }

  return (

    <Form onSubmit={handleSubmit} style={{ marginBottom: '50px' }}>      
      <Row as={Container}>
        {
          prestressedConcreteValuesArray.map(value => 
            <ValueField key={value} required>
              {createName(value)}
            </ValueField>
          )
        }
      </Row>
    </Form>
  )
}

