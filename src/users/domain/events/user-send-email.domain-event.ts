export class UserSendEmailDomainEvent {
  constructor(
    public id: string,
    public message: string,
  ) {}
}
