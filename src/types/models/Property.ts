export default class Property {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public price: number,
    public size: number,
    public imageUrl: string
  ) {}
}
