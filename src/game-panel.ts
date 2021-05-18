import {Position, VehicleDescription} from './type';
import {Level0} from './helper/data.js';

export default class GamePanel {
  private level     : number
  private exit      : Position   = { x: 5, y: 2 }
  private gamePanel : number[][] = []

  constructor(level = 0) {
    this.level     = level
    this.initGamePanel()
  }

  getExitPosition() : Position {
    return this.exit
  }

  updateLevel(level: number) : void {
    this.level = level
  }

  initGamePanel() : void {
    this.gamePanel = Level0
  }

  getGamePanel() : number[][] {
    return this.gamePanel
  }

  resetGamePanel() : number[][] {
    // todo change level
    return this.gamePanel
  }

  updateGamePanelValue (theOld : VehicleDescription, theNew: VehicleDescription) {
    this.clearGamePanel(theOld)
    this.updateGamePanel(theNew)
  }

  clearGamePanel(vehicle: VehicleDescription) {
    for (let i = 0; i < vehicle.length; i++) {
      if (vehicle.direction === 'vertical') {
        this.gamePanel[vehicle.y + i][vehicle.x] = 0
      } else {
        this.gamePanel[vehicle.y][vehicle.x + i] = 0
      }
    }
  }

  updateGamePanel(vehicle: VehicleDescription) {
    for (let i = 0; i < vehicle.length; i++) {
      if (vehicle.direction === 'vertical') {
        this.gamePanel[vehicle.y + i][vehicle.x] = vehicle.value
      } else {
        this.gamePanel[vehicle.y][vehicle.x + i] = vehicle.value
      }
    }
  }

}