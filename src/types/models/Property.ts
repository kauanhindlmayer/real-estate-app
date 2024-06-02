import Location from './Location'
import Seller from './Seller'

export default class Property {
  constructor(
    public id?: string,
    public title: string = '',
    public description: string = '',
    public price: number = 0,
    public size: number = 0,
    public bedrooms: number = 0,
    public bathrooms: number = 0,
    public type: string = '',
    public amenities: string[] = [],
    public availability: string = '',
    public imageSources: string[] = [],
    public location: Location = new Location(),
    public seller: Seller = new Seller()
  ) {}
}
