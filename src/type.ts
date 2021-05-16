export type Position = {
  x: number
  y: number
}

export type VehicleType      = 'car' | 'truck'
export type VehicleDirection = 'vertical' | 'horizonal'

export type VehicleDescription = {
  x        : number
  y        : number
  value    : number
  length   : number
  direction: VehicleDirection
}