export class BadRequestError extends Error {
  public status: number
  constructor(public message: string) {
    super(message)
    this.name = 'BadRequestError'
    this.status = 400
  }
}
