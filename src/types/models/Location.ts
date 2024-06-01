export default class Location {
  constructor(
    public id?: string,
    public address: string = '',
    public city: string = '',
    public state: string = '',
    public country: string = '',
    public zipCode: string = ''
  ) {}
}
