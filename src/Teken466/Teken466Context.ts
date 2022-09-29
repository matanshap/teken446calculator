import React, { createContext } from 'react'
import { Teken466ResultsType } from './Teken466'

export interface Teken466ContextType {
    results: Teken466ResultsType,
    alert?: string,
    setValues: React.Dispatch<React.SetStateAction<Teken466ResultsType>>
}

const ResultsContext = createContext<Teken466ContextType>({} as Teken466ContextType)

export default ResultsContext
