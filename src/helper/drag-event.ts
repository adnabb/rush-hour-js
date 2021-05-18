import {Position, VehicleDescription} from '../type'

export default {

  onDrag() :void {

  },

  onDragStart(event: DragEvent) :void {
    this.draggedElement = event.target as HTMLImageElement
    this.draggedElement.style.opacity = '.5'
  },

  onDragEnd() : void {
    this.draggedElement.style.opacity = 'unset'
  },

  onDragOver(event: DragEvent) : void {

    event.preventDefault()
  },

  onDragEnter(event: DragEvent) : void {

    const target = event.target as HTMLTableDataCellElement
    if (target.nodeName === 'TD') {
      target.style.background = 'purple'
    }
  },

  onDragLeave(event: DragEvent) : void {

    const target = event.target as HTMLTableDataCellElement
    if (target.nodeName === 'TD') {
      target.style.background = 'unset'
    }
  },

  onDragDrop(event: DragEvent) : void {
    event.preventDefault()

    const target = event.target as HTMLTableDataCellElement & DragEvent

    if (target.nodeName === 'TD') {
      target.style.background = 'unset'
      const [oldX, oldY] = this.draggedElement.dataset.position.split(',')
      const [targetX, targetY] = target.dataset.position.split(',')
      const isVertical = this.draggedElement.classList.contains('vertical')

      if ( ( isVertical && targetX !== oldX ) || ( !isVertical && targetY !== oldY) ) {
        console.error('请按照约定方向移动')
        return
      }

      const theOld: VehicleDescription = {
        value: Number(this.draggedElement.dataset.value),
        x    : Number(oldX),
        y    : Number(oldY),
        direction: isVertical ? 'vertical' : 'horizonal',
        length   : this.draggedElement.classList.contains('truck') ? 3 : 2
      }

      const movement: number = this.getVehicleMovement(theOld, {
        x: Number(targetX),
        y: Number(targetY),
      })
      const theNewPosition: Position = this.getTheNewPositionByMovement(theOld, movement)
      const theNew: VehicleDescription = {
        ...theOld,
        ...theNewPosition,
      }

      if(!this.checkMovement(theOld, movement)) {
        console.error('只能在空地处移动')
        return
      }

      console.log('temp', theNewPosition)
      console.log('movement', movement)
      this.gamePanel.updateGamePanelValue(theOld, theNew)
      this.moveVehicle(this.draggedElement, movement)
      this.draggedElement.dataset.position = `${theNew.x},${theNew.y}`
      console.log('theNew', this.gamePanel.getGamePanel())

      const exitPosition: Position = this.gamePanel.getExitPosition()

      if (theNew.x + theNew.length - 1 === exitPosition.x && theNew.y === exitPosition.y) {
        alert('恭喜你，完成任务')
        this.removeListenerToVehicle()
      }


    }

  },
}