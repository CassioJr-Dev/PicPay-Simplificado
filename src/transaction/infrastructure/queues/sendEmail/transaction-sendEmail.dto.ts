export class TransactionSendEmailDto {
  constructor(
    public receiverId: string,
    public message: string,
  ) {}
}
