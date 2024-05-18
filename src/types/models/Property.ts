import Location from './Location'

export default class Property {
  constructor(
    public title: string,
    public description: string,
    public price: number,
    public size: number,
    public imageUrl: string,
    public location: Location,
    public id?: string
  ) {}
}
