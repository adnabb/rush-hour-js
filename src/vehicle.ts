type VehicleType      = 'car' | 'truck'
type VehicleDirection = 'vertical' | 'horizontal'

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