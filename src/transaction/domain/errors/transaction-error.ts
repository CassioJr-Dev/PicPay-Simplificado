export class TransactionError extends Error {
  constructor(public message: string) {
    super(message)
    this.name = 'TransactionError'
  }
}
