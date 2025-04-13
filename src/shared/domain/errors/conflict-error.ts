export class ConflictError extends Error {
  public status: number
  constructor(public message: string) {
    super(message)
    this.name = 'ConflictFoundError'
    this.status = 409
  }
}
