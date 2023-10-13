import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ReservationsdbDataSource} from '../datasources';
import {Reservation, ReservationRelations} from '../models';

export class ReservationRepository extends DefaultCrudRepository<
  Reservation,
  typeof Reservation.prototype.id,
  ReservationRelations
> {
  constructor(
    @inject('datasources.reservationsdb') dataSource: ReservationsdbDataSource,
  ) {
    super(Reservation, dataSource);
  }
}
