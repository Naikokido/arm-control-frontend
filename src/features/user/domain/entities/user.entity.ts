export class UserEntity {
  constructor(
    public id: string,
    public fullname: string,
    public email: string,
    public password: string,
    public role: string,
    public phone: string,
    public enabled?: boolean | null,
  ) {}
}
