import {Position} from './type';
import {Level0} from './helper/data.js';

export default class GamePanel {
  private level     : number
  private exit      : Position   = { x: 5, y: 2 }
  private gamePanel : number[][] = []

  constructor(level = 0) {
    this.level     = level
    this.initGamePanel()
  }

  initGamePanel() : void {
    this.gamePanel = Level0
  }

  getGamePanel() : number[][] {
    return this.gamePanel
  }

  updateGamePanel() : number[][] {
    return this.gamePanel
  }

}