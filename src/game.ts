import GamePanel from "./game-panel.js"
import {VehicleDescription} from './type'
import parseVehicle from './helper/parse-vehicle.js'

export default class Game {
  private level    : number
  private gamePanel: GamePanel

  constructor(level = 0) {
    this.level     = level
    this.gamePanel = new GamePanel(level)
  }

  getConfig() {
    return this.gamePanel.getGamePanel()
  }

  render(selector: string) {
    const rootElement : HTMLDivElement   = document.querySelector(selector)
    const gameBoardWrapper: HTMLDivElement = document.createElement('div')
    gameBoardWrapper.className = 'game-board-wrapper'
    const gameBoard   : HTMLTableElement = this.getGameBoardDom()
    gameBoardWrapper.appendChild(gameBoard)
    const vehicles: HTMLImageElement[] = this.getVehicleDoms()
    vehicles.forEach((img) => {
      gameBoardWrapper.appendChild(img)
    })

    rootElement.appendChild(gameBoardWrapper)
  }

  getGameBoardDom() : HTMLTableElement {
    const gameBoard   : HTMLTableElement = document.createElement('table')
    gameBoard.className = 'game-board'
    gameBoard.border    = '1'
    gameBoard.innerHTML = `
      <tr> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
      <tr> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
      <tr> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
      <tr> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
      <tr> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
      <tr> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
    `

    return gameBoard
  }

  getVehicleDoms() : HTMLImageElement[] {
    const vehicles: VehicleDescription[] = parseVehicle(this.getConfig())
    console.log(333, vehicles)
    const svgDoms = vehicles.map((vehicle) => {
      const vehicleType: string = vehicle.value === -1 ? 'bike' : (
          vehicle.length === 2 ? 'car' : 'truck'
      )
      const img = new Image()

      img.src = vehicleType === 'car' ? './image/car.svg' : (
          vehicleType === 'bike' ? './image/bike.svg' : './image/truck.svg'
      )
      img.className = `vehicle ${vehicleType} ${vehicle.direction}`
      img.style.left  = vehicle.x * 50 + 'px'
      img.style.top = vehicle.y * 50 + 'px'

      return img
    })

    return svgDoms
  }

}