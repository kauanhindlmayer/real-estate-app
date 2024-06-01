import Location from './Location'
import Seller from './Seller'

export default class Property {
  constructor(
    public id?: string,
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
    public seller?: Seller
  ) {}
}
