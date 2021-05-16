import Game from './game.js'

window.onload = () => {
  const app = document.querySelector('#app')
  const game = new Game()
  game.render('#app')
}
