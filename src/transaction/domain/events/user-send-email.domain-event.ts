export class TransactionSendEmailDomainEvent {
  constructor(
    public receiverId: string,
    public message: string,
  ) {}
}
