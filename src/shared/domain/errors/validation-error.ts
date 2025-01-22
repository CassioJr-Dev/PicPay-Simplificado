import { FieldsErrors } from '../validators/validator-fields.interface'

export class EntityValidationError extends Error {
  constructor() {
    super('Entity Validation Error')
    this.name = 'EntityValidationError'
  }
}
