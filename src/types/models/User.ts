export default class User {
  constructor(
    public fullName: string,
    public email: string,
    public avatarUrl: string,
    public access_token: string,
    public password?: string,
    public id?: string
  ) {}
}
