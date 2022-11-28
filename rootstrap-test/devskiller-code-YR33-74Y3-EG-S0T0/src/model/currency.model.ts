export class Currency {
  constructor(
    public currency_id: any | undefined,
    public currency_name: any | undefined,
    public currency_symbol: any | undefined,
    public currency_total_supply: any | undefined,
    public currency_last_updated: any | undefined
  ) {
    this.currency_id = currency_id
    this.currency_name = currency_name
    this.currency_name = currency_name
    this.currency_total_supply = currency_total_supply
    this.currency_last_updated = currency_last_updated
  }
}
