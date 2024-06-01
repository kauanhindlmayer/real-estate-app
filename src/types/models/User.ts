export default class User {
  constructor(
    public id?: string,
    public fullName: string = '',
    public email: string = '',
    public password: string = '',
    public avatarUrl: string = '',
    public accessToken: string = ''
  ) {}
}
