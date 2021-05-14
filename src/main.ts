import GamePanel from "./game-panel";

export default class game {
  private level    : number
  private gamePanel

  constructor(level = 0) {
    this.level = level
  }

  initPanel() {
    this.gamePanel = new GamePanel()
  }

  render() {

  }

}