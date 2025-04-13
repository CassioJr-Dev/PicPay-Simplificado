export class UnprocessableError extends Error {
  public status: number
  constructor(message: string = 'Entity Validation Error') {
    super(message)
    this.name = 'Unprocessable Entity'
    this.status = 422
  }
}
