import React, {createContext} from 'react'
import { PrestressedConcreteResultsType } from './PrestressedConcrete'
import { AlertType } from '../types'

export interface PrestressedConcreteContextType {
  alert: AlertType,
  setAlert: React.Dispatch<React.SetStateAction<AlertType>>,
  setResults: React.Dispatch<React.SetStateAction<PrestressedConcreteResultsType>>,
  results: PrestressedConcreteResultsType
}

const PrestressedConcreteContext = createContext<PrestressedConcreteContextType>({} as PrestressedConcreteContextType)

export default PrestressedConcreteContext


