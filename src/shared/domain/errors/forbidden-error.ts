export class ForbiddenError extends Error {
  public status: number
  constructor(public message: string) {
    super(message)
    this.name = 'ForbiddenError'
    this.status = 403
  }
}
