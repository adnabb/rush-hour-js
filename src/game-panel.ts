export default class GamePanel {
  private width     : number
  private height    : number
  private gamePanel : Array<number[]>

  constructor(width = 6, height = 6) {
    this.width     = width
    this.height    = height
    this.gamePanel = []
  }

  initGamePanel() : void {
    // this.gamePanel = new Array<number>(this.height).fill(
    //   new Array<number>(this.width).fill(0)
    // )
  }

  getGamePanel() : number[][] {
    return this.gamePanel
  }

}