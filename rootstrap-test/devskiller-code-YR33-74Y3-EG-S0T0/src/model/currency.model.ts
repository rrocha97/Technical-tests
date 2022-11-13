export class Currency {
  constructor(
    public currency_id: any | undefined,
    public currency_name: any | undefined,
    public currency_symbol: any | undefined,
    public currency_total_supply: any | undefined,
    public currency_last_updated: any | undefined
  ) {

  }
}

export class Exchange {
  constructor(
    public id: any | undefined,
    public name: any | undefined,
  ) {

  }
}