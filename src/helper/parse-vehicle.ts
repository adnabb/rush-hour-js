import {VehicleDescription, VehicleDirection} from '../type'

const result  : VehicleDescription[] = []
let   list    : number[][]           = []

export default function parseVehicle (gamePanel: number[][]) : VehicleDescription[] {
  list = gamePanel

  gamePanel.forEach((row: number[], index: number) => {
    const vehicleValues: number[]    = row.filter(value => value !== 0)

    vehicleValues.length && vehicleValues.forEach((value) => {
      if (vehicleValues.filter(value1 => value1 === value).length === 1) {
        handleVertical(value, index)
      } else {
        handleHorizonal(value, index)
      }
    })

  })

  return result

}

function handleHorizonal(value: number, y: number) {
  updateDescription(value, 'horizonal', y)
}

function handleVertical(value: number, y: number) {
  updateDescription(value, 'vertical', y)
}

function updateDescription(value: number, direction: VehicleDirection, y: number) {
  const x: number = list[y].indexOf(value)
  const filterd = result.filter(desc => desc.value === value)

  if (filterd.length) {
    filterd[0].length += 1

  } else {
    initDescription(value, direction, x, y)
  }
}

function initDescription(value: number, direction: VehicleDirection, x: number, y: number) {
  result.push({
    x,
    y,
    value,
    direction,
    length   : 1,
  })

}
