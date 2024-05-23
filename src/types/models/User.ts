import type { UserTypeEnum } from '../enums/UserTypeEnum'

export default class User {
  constructor(
    public fullName: string,
    public email: string,
    public password: string,
    public userType: UserTypeEnum,
    public avatar: string,
    public id?: number
  ) {}
}
