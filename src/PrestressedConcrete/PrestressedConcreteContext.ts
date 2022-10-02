import React, {createContext} from 'react'
import { PrestressedConcreteResultsType } from './PrestressedConcrete'
import { AlertType } from '../types'

export interface PrestressedConcreteContextType {
  alert: AlertType,
  setAlert: React.Dispatch<React.SetStateAction<AlertType>>,
  setResults: React.Dispatch<React.SetStateAction<PrestressedConcreteResultsType>>,
  results: PrestressedConcreteResultsType
}

export const mockData: {[key in PrestressedConcreteValuesType]: number} = {
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


const PrestressedConcreteContext = createContext<PrestressedConcreteContextType>({} as PrestressedConcreteContextType)

export default PrestressedConcreteContext


