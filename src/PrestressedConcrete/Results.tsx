import React from 'react'
import PrestressedConcreteContext, { PrestressedConcreteContextType } from './PrestressedConcreteContext'
import { Field } from '../CustomComponents'



export default function Results() {
  return (
    <PrestressedConcreteContext.Consumer>
      {({results}) => Object.entries(results).map(
        ([key, value]) => <Field title={key} value={value} />)}
    </PrestressedConcreteContext.Consumer>
  )
}
