import GamePanel from "./game-panel.js"
import {VehicleDescription, Position, VehicleDirection} from './type'
import parseVehicle from './helper/parse-vehicle.js'

export default class Game {
  private level    : number
  private gamePanel: GamePanel

  constructor(level = 0) {
    this.level     = level
    this.gamePanel = new GamePanel(level)
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
    const svgDoms = vehicles.map((vehicle) => {
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


    return svgDoms
  }

  addEventListenerToVehicle() {
    let draggedElement: HTMLImageElement

    document.addEventListener('drag', (event) => {
    }, false)

    document.addEventListener('dragstart', (event) => {
      draggedElement = event.target as HTMLImageElement
      draggedElement.style.opacity = '.5'
    }, false)

    document.addEventListener("dragend", (event) => {
      draggedElement.style.opacity = 'unset'
    })

    document.addEventListener('dragover', (event) => {
      event.preventDefault()
    })

    document.addEventListener('dragenter', (event) => {
      const target = event.target as HTMLTableDataCellElement
      if (target.nodeName === 'TD') {
        target.style.background = 'purple'
      }
    })

    document.addEventListener('dragleave', (event) => {
      const target = event.target as HTMLTableDataCellElement
      if (target.nodeName === 'TD') {
        target.style.background = 'unset'
      }
    })

    document.addEventListener('drop', (event) => {
      event.preventDefault()

      const target = event.target as HTMLTableDataCellElement & DragEvent

      if (target.nodeName === 'TD') {
        target.style.background = 'unset'
        const [oldX, oldY] = draggedElement.dataset.position.split(',')
        const [targetX, targetY] = target.dataset.position.split(',')
        const theOld: VehicleDescription = {
          value: Number(draggedElement.dataset.value),
          x    : Number(oldX),
          y    : Number(oldY),
          direction: draggedElement.classList.contains('vertical') ? 'vertical' : 'horizonal',
          length   : draggedElement.classList.contains('truck') ? 3 : 2
        }

        const movement: number = this.getVehicleMovement(theOld, {
          x: Number(targetX),
          y: Number(targetY),
        })
        const theNewPosition: Position = this.getTheNewPositionByMovement(theOld, movement)

        console.log('temp', theNewPosition)
        this.gamePanel.updateGamePanelValue(theOld, {
          ...theOld,
          ...theNewPosition,
        })
        this.moveVehicle(draggedElement, movement)
        console.log('theNew', this.gamePanel.getGamePanel())

      }

    })
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
