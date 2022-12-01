export class CreateOrderrDto {
  readonly equipment_id: number;
  readonly user_id: number;
  readonly start_date: Date;
  readonly end_date: Date;
  readonly total_price: number;
}
