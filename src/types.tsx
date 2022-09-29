import { AlertProps } from 'react-bootstrap'

export interface FormFields {
  h: number | undefined, 
  ds: number | undefined, 
  rho: number | undefined, 
  cp: number | undefined, 
  u0: number | undefined, 
  u1: number | undefined, 
  vdeq: number | undefined, 
  fck: string | undefined,
}

export interface AlertType {
  message: string,
  variant: AlertProps["variant"],
  on: boolean
}
