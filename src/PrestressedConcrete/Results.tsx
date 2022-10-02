import React, { useContext } from 'react'
import PrestressedConcreteContext, { PrestressedConcreteContextType } from './PrestressedConcreteContext'
import { Field } from '../CustomComponents'



export default function Results() {
  const context = useContext(PrestressedConcreteContext)
  return (
    <>
    {
      Object.keys(context.results).map(item => <div>{item}</div>)
    }
    </>
  )
}
