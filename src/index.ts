
import Game from './game.js'

window.onload = () => {
  const app = document.querySelector('#app')
  const game = new Game()
  game.render('#app')
  console.log('oldValue', game.getConfig())
}

// import { fromEvent } from 'rxjs/Observal'

// fromEvent(window, 'onload', () => {
//   console.log(1111)
// })


