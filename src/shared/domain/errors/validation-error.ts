export class EntityValidationError extends Error {
  constructor(message: string = 'Entity Validation Error') {
    super(message)
    this.name = 'EntityValidationError'
  }
}
