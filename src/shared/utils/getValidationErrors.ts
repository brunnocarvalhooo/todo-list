import { ValidationError } from 'yup'

export interface Errors {
  [key: string]: string
}

export function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {}

  err.inner.forEach((error) => {
    if (error.path) {
      validationErrors[error.path] = error.message
    }
  })

  return validationErrors
}
