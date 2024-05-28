import Location from './Location'

export default class Property {
  constructor(
    public title: string = '',
    public description: string = '',
    public price: number = 0,
    public size: number = 0,
    public imageSources: string[] = [],
    public location: Location = new Location(),
    public type?: string,
    public bedrooms?: number,
    public bathrooms?: number,
    public amenities?: string[],
    public availability?: string,
    public id?: string
  ) {}
}
