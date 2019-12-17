import Rover, { Direction, directionMapper } from './Rover'

class Plateau {

  private rovers: Rover[] = []

  constructor(private width: number, private height: number) {}

  addRover(position: string) {
    const [_x, _y, _direction] = position.split(' ')
    const x = Number(_x),
          y = Number(_y),
          direction = <Direction> _direction
    this.validateLocation([x, y], direction)
    this.rovers.push(new Rover(x, y, direction))
  }

  instructRover(index: number, instructions: string) {
    const rover = this.rovers[index]
    if (!rover)
      throw new Error(`No rover at index ${index}`)

    rover.explore(instructions)
    this.validateLocation(rover.getLocation())
  }

  printRoverLocations() {
    console.log('Rover locations:')
    for (const rover of this.rovers) {
      console.log('%s %s %s', ...rover.getLocation(), rover.getOrientation())
    }
  }

  private validateLocation(location: number[], orientation?: Direction) {
    if (isNaN(location[0]) || isNaN(location[1]))
      throw new Error('Invalid location')

    if (location[0] < 0 || location[0] > this.width || location[1] < 0 || location[1] > this.height)
      throw new Error(`New rover location exceeds boundaries of width ${this.width}, height ${this.height}`)

    if (orientation && !Object.keys(directionMapper).includes(orientation))
      throw new Error (`Invalid orientation`)
  }

}

export default Plateau
