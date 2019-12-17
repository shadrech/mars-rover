import Rover from './Rover';

describe('Rover', () => {

  let rover: Rover

  beforeEach(() => {
    jest.clearAllMocks()
    rover = new Rover(2, 3, 'East')
  })

  it('initializes correctly', () => {
    expect((rover as any).x).toBe(2)
    expect((rover as any).y).toBe(3)
    expect((rover as any).orientation).toBe(1)
  })

  it('returns correct location array when getLocation() is called', () => {
    expect(rover.getLocation()).toEqual([2, 3])
  })

  describe('getOrientation()', () => {

    it('returns orientation in readable format when called', () => {
      expect(rover.getOrientation()).toBe('East')
    })

    it('returns orientation in number format when called with false', () => {
      expect(rover.getOrientation(false)).toBe(1)
    })

  })

  describe('setOrientation()', () => {

    it('sets correct orientation when "L" given', () => {
      rover.setOrientation('L')
      expect((rover as any).orientation).toBe(0)
      rover.setOrientation('L')
      expect((rover as any).orientation).toBe(3)
    })

    it('sets correct orientation when "R" given', () => {
      rover.setOrientation('R')
      expect((rover as any).orientation).toBe(2)
      rover.setOrientation('R')
      rover.setOrientation('R')
      expect((rover as any).orientation).toBe(0)
    })

  })

  describe('move()', () => {

    it('moves right direction when orientation is "North"', () => {
      rover = new Rover(2, 3, 'North')
      rover.move()
      expect((rover as any).y).toBe(4)
      expect((rover as any).x).toBe(2)
    })

    it('moves right direction when orientation is "East"', () => {
      rover.move()
      expect((rover as any).x).toBe(3)
      expect((rover as any).y).toBe(3)
    })

    it('moves right direction when orientation is "South"', () => {
      rover = new Rover(2, 3, 'South')
      rover.move()
      expect((rover as any).x).toBe(2)
      expect((rover as any).y).toBe(2)
    })

    it('moves right direction when orientation is "West"', () => {
      rover = new Rover(2, 3, 'West')
      rover.move()
      expect((rover as any).x).toBe(1)
      expect((rover as any).y).toBe(3)
    })

  })

  describe('explore()', () => {

    it('follows valid instructions correctly', () => {
      jest.spyOn(rover, 'move')
      jest.spyOn(rover, 'setOrientation')
      rover.explore('MLMRMM')
      expect(rover.move).toHaveBeenCalled()
      expect(rover.setOrientation).toHaveBeenCalledWith('L')
      expect(rover.move).toHaveBeenCalled()
      expect(rover.setOrientation).toHaveBeenCalledWith('R')
      expect(rover.move).toHaveBeenCalled()
      expect(rover.move).toHaveBeenCalled()
    })

    it('errors when invalid instruction given', () => {
      expect(() => {
        rover.explore('MARS')
      }).toThrowError('Instruction not recognised')
    })

  })

})
