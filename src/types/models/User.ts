export default class User {
  constructor(
    public id?: number,
    public fullName: string = '',
    public email: string = '',
    public password: string = '',
    public avatarUrl: string = ''
  ) {}
}
