export default class Location {
  constructor(
    public address: string,
    public city: string,
    public state: string,
    public country: string,
    public zipCode: string | number, // TODO: Remove this when the API is fixed
    public id?: string
  ) {}
}
