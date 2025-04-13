export class NotFoundError extends Error {
  public status: number
  constructor(public message: string) {
    super(message)
    this.name = 'NotFoundError'
    this.status = 404
  }
}
