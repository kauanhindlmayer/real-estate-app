export default class User {
  constructor(
    public fullName: string = '',
    public email: string = '',
    public password: string = '',
    public avatarUrl: string = '',
    public id?: number
  ) {}
}
