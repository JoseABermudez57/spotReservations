import {repository} from '@loopback/repository';
import {model, property} from '@loopback/repository';
import {get, post, param, requestBody, HttpErrors, put, del} from '@loopback/rest';
import {Reservation} from '../models';
import {ReservationRepository} from '../repositories';

export class ReservationsController {
  
  constructor(
    @repository(ReservationRepository)
    public reservationRepository: ReservationRepository,
  ) {}

  // Crear reservacion
  @post('/reservations', {
    responses: {
      '200': {
        description: 'Reserve a parking spot',
        content: {'application/json': {schema: model, isArray: true}},
      },
    },
  })
  async createReservation(
    @requestBody({
      content: {
        'application/json': {
          schema: {type: 'object'},
        },
      },
    })
    reservation: Reservation,
  ): Promise<Reservation> {
    return this.reservationRepository.create(reservation);
  }

  // Buscar por ID
  @get('/reservations/{id}', {
    responses: {
      '200': {
        description: 'Reservation by ID',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Reservation}},
          },
        },
      },
    },
  })
  async findReservationById(@param.path.number('id') id: number): Promise<Reservation> {
    const reservation = await this.reservationRepository.findById(id);
    if (!reservation) {
      throw new HttpErrors.NotFound(`Reservation with ID ${id} not found.`);
    }
    return reservation;
  }

  //Actualizar por ID
  @put('/reservations/{id}')
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() reservation: Reservation,
  ): Promise<void> {
    await this.reservationRepository.updateById(id, reservation);
  }

  //Eliminar por ID
  @del('/reservations/{id}')
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.reservationRepository.deleteById(id);
  }

}
