export class EntityValidationError extends Error {
  constructor() {
    super('Entity Validation Error')
    this.name = 'EntityValidationError'
  }
}
