export type Direction = 'North' | 'East' | 'South' | 'West'
export const directionMapper: Record<Direction, number> = {
  North: 0,
  East: 1,
  South: 2,
  West: 3
}
const orientationMapper: Record<number, Direction> = {
  0: 'North',
  1: 'East',
  2: 'South',
  3: 'West'
}

class Rover {

  private orientation: number

  constructor(private x: number, private y: number, orientation: Direction) {
    this.orientation = directionMapper[orientation]
  }

  getLocation() {
    return [this.x, this.y]
  }

  getOrientation(readable: boolean = true) {
    return readable ? orientationMapper[this.orientation] : this.orientation
  }

  setOrientation(direction: 'L' | 'R') {
    if (direction === 'L') {
      this.orientation -= 1
      if (this.orientation < directionMapper.North)
        this.orientation = directionMapper.West
    } else {
      this.orientation += 1
      if (this.orientation > directionMapper.West)
        this.orientation = directionMapper.North
    }
  }

  move() {
    if (this.orientation % 2 === 0)
      this.y += this.orientation === 0 ? 1 : -1
    else
      this.x += this.orientation === 1 ? 1 : -1
  }

  explore(instructions: string) {
    for (let i = 0, total = instructions.length; i < total; i++) {
      switch (instructions[i]) {
        case 'M':
          this.move()
          break
        case 'L':
          this.setOrientation('L')
          break
        case 'R':
          this.setOrientation('R')
          break
        default:
          throw new Error('Instruction not recognised')
      }
    }
  }

}

export default Rover
