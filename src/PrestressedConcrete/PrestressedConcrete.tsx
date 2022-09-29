import { useState } from "react"
import { Container, Row, Col, Button, Alert } from "react-bootstrap"
import Results from "./Results"
import { exportToCsv } from "../utils"
import PrestressedConcreteForm from "./PrestressedConcreteForm"
import PrestressedConcreteContext from "./PrestressedConcreteContext"
import { AlertType } from "../types"
import { CsvExportButton } from "../CustomComponents"

enum Reinforcement {
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

export default function PrestressedConcrete() {
  const [results, setResults] = useState<PrestressedConcreteResultsType>()
  const [alert, setAlert] = useState<AlertType>({
    on: false, 
    message: '',
    variant: ''
  })
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

