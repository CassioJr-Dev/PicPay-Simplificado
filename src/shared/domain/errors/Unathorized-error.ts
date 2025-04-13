export class UnauthorizedError extends Error {
  public status: number
  constructor(public message: string) {
    super(message)
    this.name = 'UnauthorizedError'
    this.status = 401
  }
}
