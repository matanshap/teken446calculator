import React from 'react'
import { Form, Row, Col, InputGroup, Button } from 'react-bootstrap'
import { exportToCsv } from './utils'


export const createName = (name: string) => {
  const arr = name.split('_')
  if (arr.length == 1) return <>{arr[0]}</>
  if (arr[0] == 'eps') return <>&epsilon; <sub>{arr[1]}</sub></>
  return <div>{arr[0]}<sub>{arr[1]}</sub></div>
}


export const Field = (props: {title: string, value: number}) => {
  const {title, value} = props
  return (
    <Form.Group as={Row}>
      <Form.Label as={Col} xs="4">
        { createName(title) }
      </Form.Label>
      <Col xs="8">
        <Form.Control readOnly  value={value} style={{backgroundColor: 'rgba(255, 255, 255, 0.7)'}} />
      </Col>
    </Form.Group>
  )
}

export interface ValueFieldProps {
  required: boolean
  value?: number,
  text?: string, 
  end?: string, 
  readOnly?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  title: string
}

export const ValueField = (props: ValueFieldProps)=> {
  return (
    <Col xs="12" sm="12" md="12" lg={{span: 6, offset: 0}} style={{margin: 'auto'}}  xl="6"  >
      <Form.Group as={Row} >
        <Col xs={{span: 4}} style={{flexWrap: 'nowrap'}} >
          <Row /* style={{margin: 0}} */>
            <Col xs="8" style={{ padding: '0 5px 0 0'}}>
              <Form.Text style={{direction: 'rtl', lineHeight: 1}} >{props.text}</Form.Text>
            </Col>
            <Col xs="4">
              <Form.Label style={{whiteSpace: 'nowrap'}} >
                { createName(props.title) }
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
              style={{backgroundColor: 'rgba(255, 255, 255, 0.7)'}}
              step="any"
              value={props.value}
              name={props.title}
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





export const CsvExportButton = (props: {mapping: {[key: string]: any}}) => {
  const {mapping} = props
  return (
    <Button  
      size="lg" 
      style={{ direction: 'rtl' }} 
      onClick={() => exportToCsv(Object.keys(mapping), Object.values(mapping))} >
        ייצוא לקובץ Excel
    </Button>
  )
}






