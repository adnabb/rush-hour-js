import GamePanel from "./game-panel.js"
import {VehicleDescription, Position} from './type'
import parseVehicle from './helper/parse-vehicle.js'
import dragEvent from "./helper/drag-event.js"

export default class Game {
  private level    : number
  private gamePanel: GamePanel
  private draggedElement: EventTarget & HTMLImageElement = null

  private onDrag: () => void
  private onDragStart: () => void
  private onDragOver : () => void
  private onDragLeave: () => void
  private onDragEnter: () => void
  private onDragDrop : () => void
  private onDragEnd  : () => void

  constructor(level = 0) {
    this.level     = level
    this.gamePanel = new GamePanel(level)
    this.onDrag      = dragEvent.onDrag.bind(this)
    this.onDragStart = dragEvent.onDragStart.bind(this)
    this.onDragOver  = dragEvent.onDragOver.bind(this)
    this.onDragLeave = dragEvent.onDragLeave.bind(this)
    this.onDragEnter = dragEvent.onDragEnter.bind(this)
    this.onDragDrop  = dragEvent.onDragDrop.bind(this)
    this.onDragEnd   = dragEvent.onDragEnd.bind(this)
  }

  getDragElement() : EventTarget & HTMLImageElement {
    return this.draggedElement
  }

  updateLevel(level: number) {
    this.gamePanel.updateLevel(level)
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

    this.addEventListenerToVehicle()

    rootElement.appendChild(gameBoardWrapper)
  }

  getGameBoardDom() : HTMLTableElement {
    const gameBoard   : HTMLTableElement = document.createElement('table')
    gameBoard.className = 'game-board'
    gameBoard.border    = '1'
    gameBoard.innerHTML = `
      <tr> <td data-position="0,0"></td> <td data-position="1,0"></td> <td data-position="2,0"></td> <td data-position="3,0"></td> <td data-position="4,0"></td> <td data-position="5,0"></td> </tr>
      <tr> <td data-position="0,1"></td> <td data-position="1,1"></td> <td data-position="2,1"></td> <td data-position="3,1"></td> <td data-position="4,1"></td> <td data-position="5,1"></td> </tr>
      <tr> <td data-position="0,2"></td> <td data-position="1,2"></td> <td data-position="2,2"></td> <td data-position="3,2"></td> <td data-position="4,2"></td> <td data-position="5,2"></td> </tr>
      <tr> <td data-position="0,3"></td> <td data-position="1,3"></td> <td data-position="2,3"></td> <td data-position="3,3"></td> <td data-position="4,3"></td> <td data-position="5,3"></td> </tr>
      <tr> <td data-position="0,4"></td> <td data-position="1,4"></td> <td data-position="2,4"></td> <td data-position="3,4"></td> <td data-position="4,4"></td> <td data-position="5,4"></td> </tr>
      <tr> <td data-position="0,5"></td> <td data-position="1,5"></td> <td data-position="2,5"></td> <td data-position="3,5"></td> <td data-position="4,5"></td> <td data-position="5,5"></td> </tr>
    `

    return gameBoard
  }

  getVehicleDoms() : HTMLImageElement[] {
    const vehicles: VehicleDescription[] = parseVehicle(this.getConfig())

    return vehicles.map((vehicle) => {
      const vehicleType: string = vehicle.value === -1 ? 'bike' : (
          vehicle.length === 2 ? 'car' : 'truck'
      )
      const img = new Image()

      img.src = vehicleType === 'car' ? './image/car.svg' : (
          vehicleType === 'bike' ? './image/bike.svg' : './image/truck.svg'
      )
      img.dataset.value    = vehicle.value.toString(10)
      img.dataset.position = `${vehicle.x},${vehicle.y}`
      img.className   = `vehicle ${vehicleType} ${vehicle.direction}`
      img.style.left  = vehicle.x * 50 + 'px'
      img.style.top   = vehicle.y * 50 + 'px'

      return img
    })

  }



  addEventListenerToVehicle() {

    document.addEventListener('drag', this.onDrag, false)

    document.addEventListener('dragstart', this.onDragStart, false)

    document.addEventListener("dragend", this.onDragEnd)

    document.addEventListener('dragover', this.onDragOver)

    document.addEventListener('dragenter', this.onDragEnter)

    document.addEventListener('dragleave', this.onDragLeave)

    document.addEventListener('drop', this.onDragDrop)
  }

  removeListenerToVehicle() {

    document.removeEventListener('drag', this.onDrag, false)

    document.removeEventListener('dragstart', this.onDragStart, false)

    document.removeEventListener("dragend", this.onDragEnd)

    document.removeEventListener('dragover', this.onDragOver)

    document.removeEventListener('dragenter', this.onDragEnter)

    document.removeEventListener('dragleave', this.onDragLeave)

    document.removeEventListener('drop', this.onDragDrop)
  }

  checkMovement(theOld: VehicleDescription, movement: number) : boolean {
    let result: boolean = true
    const gamePanel: number[][] = this.gamePanel.getGamePanel()
    const isVertical: boolean = theOld.direction === 'vertical'

    for (let i = 0; i < theOld.length; i++) {
      if (isVertical && [theOld.value, 0].indexOf(gamePanel[theOld.y + i + movement][theOld.x]) === -1) {
        result = false
      }


      console.log('validate', gamePanel[theOld.y][theOld.x + i + movement])

      if (!isVertical && [theOld.value, 0].indexOf(gamePanel[theOld.y][theOld.x + i + movement]) === -1) {
        result = false
      }
    }

    return result
  }

  moveVehicle(vehicle: HTMLImageElement, movement: number) : void {
    const isVertical : boolean = vehicle.classList.contains('vertical')

    if (isVertical) {
      vehicle.style.top = parseInt( vehicle.style.top, 10 ) + movement * 50 + 'px'
    } else {
      vehicle.style.left = parseInt( vehicle.style.left, 10 ) + movement * 50 + 'px'
    }
  }

 getTheNewPisition(theOld: VehicleDescription, targetPosition: Position) : Position {
    const movement: number = this.getVehicleMovement(theOld, targetPosition)

    return this.getTheNewPositionByMovement(theOld, movement)
 }

 getTheNewPositionByMovement(theOld: VehicleDescription, movement: number) : Position {

   return theOld.direction === 'vertical' ? {
     x: theOld.x,
     y: theOld.y + movement
   } : {
     x: theOld.x + movement,
     y: theOld.y
   }
 }

  getVehicleMovement(theOld: VehicleDescription, theNew: Position) : number {
    return (
      theOld.direction === 'vertical' ? (
        theNew.y - theOld.y < 0 ? ( theNew.y - theOld.y ) : (
          theNew.y  - ( theOld.y + theOld.length - 1 )
        )
      ) : (
        theNew.x - theOld.x < 0 ? ( theNew.x - theOld.x ) : (
          theNew.x  - ( theOld.x + theOld.length - 1 )
      )
      )
    )

  }

}
