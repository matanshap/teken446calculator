import React, { useContext } from 'react'
import { Alert } from 'react-bootstrap'
import PrestressedConcreteContext, { PrestressedConcreteContextType } from './PrestressedConcreteContext'
import { Reinforcement } from './PrestressedConcrete'
import { Field } from '../CustomComponents'



export default function Results() {
  const context = useContext(PrestressedConcreteContext)
  return (
    <>
      
      
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <Alert 
          variant={context.results.reinforcementType == Reinforcement.UnderReinforced ? 'primary' : 'secondary'}
        > 
          Under Reinforced
        </Alert> 
        <Alert 
          variant={context.results.reinforcementType == Reinforcement.UnderReinforced ? 'secondary' : 'primary'}
        >
          Over Reinforced
        </Alert>
      </div>
      
      <Field title='M_ult' value={context.results.M_ult}/>
      <Field title='M_cdmax' value={context.results.M_cdmax}/>
      <Field title='d' value={context.results.d}/>
      <Alert>
        {context.results.valid ? "תקין" : "לא תקין"}
      </Alert>
      {
        Object.keys(context.results).map(item => <div>{item}</div>)
      }
    </>
  )
}
