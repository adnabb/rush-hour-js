import {VehicleDirection, VehicleType} from './type'

export default class Vehicle {
  private type     : VehicleType
  private direction: VehicleDirection

  constructor(type: VehicleType, direction: VehicleDirection) {
    this.type      = type
    this.direction = direction
  }

  getInfo() {

  }

  move() {

  }

}