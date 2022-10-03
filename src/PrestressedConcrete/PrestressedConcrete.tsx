import { useEffect, useState } from "react"
import { Container, Row, Col, Button, Alert } from "react-bootstrap"
import Results from "./Results"
import { exportToCsv } from "../utils"
import PrestressedConcreteForm from "./PrestressedConcreteForm"
import PrestressedConcreteContext from "./PrestressedConcreteContext"
import { AlertType } from "../types"
import { CsvExportButton } from "../CustomComponents"

export enum Reinforcement {
  UnderReinforced = "UnderReinforced", 
  OverReinforced = "OverReinforced"
}

export interface PrestressedConcreteResultsType {
  reinforcementType: Reinforcement,
  M_ult: number,
  M_cdmax: number,
  valid: boolean,
  d: number
}

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

export default function PrestressedConcrete() {
  const [results, setResults] = useState<PrestressedConcreteResultsType>()
  const [alert, setAlert] = useState<AlertType>({
    on: false, 
    message: '',
    variant: ''
  })

  useEffect(() => console.log('results', results), [results])

  return (
    <PrestressedConcreteContext.Provider value={{setResults, results, setAlert, alert}}>    
      <Container as={Row} fluid style={{margin: 0}}>
        <Col sm={6} style={{ textAlign: 'center', marginTop: '30px' }} >
          <h1> נתונים</h1>
          <PrestressedConcreteForm />
          <CsvExportButton mapping={results} />
        </Col>
        <Col sm={6} style={{ marginTop: '30px', textAlign: 'center' }}>
          <h1>תוצאות</h1>
          { alert.on && <Results /> }
          { alert.on && <Alert style={{ textAlign: 'center' }} variant={alert.variant}>
          { alert.message }
          </Alert> }
        </Col>
      </Container>
    </PrestressedConcreteContext.Provider>
  )
}

