import {Entity, model, property} from '@loopback/repository';

@model()
export class Reservation extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  parkingSpot: number;

  @property({
    type: 'date',
    required: true,
  })
  startDate: string;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  endDate: string;


  constructor(data?: Partial<Reservation>) {
    super(data);
  }
}

export interface ReservationRelations {
  // describe navigational properties here
}

export type ReservationWithRelations = Reservation & ReservationRelations;
