import React from 'react'
import Teken466Context, { Teken466ContextType } from './Teken466Context'
import { Field } from '../CustomComponents'



export default function Results() {
  return (
    <Teken466Context.Consumer>
      {({results}) => Object.entries(results).map(
        ([key, value]) => <Field title={key} value={value} key={key} />)}
    </Teken466Context.Consumer>
  )
}
