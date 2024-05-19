import Location from './Location'

export default class Property {
  constructor(
    public title: string = '',
    public description: string = '',
    public price: number = 0,
    public size: number = 0,
    public imageUrl: string = '',
    public location: Location = new Location(),
    public id?: string
  ) {}
}
