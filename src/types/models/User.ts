import { UserTypeEnum } from '../enums/UserTypeEnum'

export default class User {
  constructor(
    public fullName: string = '',
    public email: string = '',
    public password: string = '',
    public userType: UserTypeEnum = UserTypeEnum.AGENT,
    public avatar: string = '',
    public id?: number
  ) {}
}
