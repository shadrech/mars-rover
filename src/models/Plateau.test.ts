import Plateau from './Plateau'
import Rover from './Rover'

describe('Plateau', () => {

  let plateau: any // remove typings so we can test private variables

  beforeEach(() => {
    jest.clearAllMocks()
    plateau = new Plateau(5, 6)
  })

  it('initializes correctly', () => {
    expect(plateau.width).toEqual(5)
    expect(plateau.height).toEqual(6)
    expect(plateau.rovers).toEqual([])
  })

  describe('addRover()', () => {

    it('adds new rover when called with string in correct format', () => {
      plateau.addRover('1 2 North')
      expect(plateau.rovers.length).toBe(1)
      expect(plateau.rovers[0] instanceof Rover).toBeTruthy()
    })

    it('errors if invalid position value given', () => {
      expect(() => {
        plateau.addRover('hello 1 North')
      }).toThrowError('Invalid location')
    })

    it('errors if any position value exceeds width/height', () => {
      expect(() => {
        plateau.addRover('2 9 East')
      }).toThrowError('New rover location exceeds boundaries of width 5, height 6')
    })

    it('errors if invalid orientation given', () => {
      expect(() => {
        plateau.addRover('2 4 W')
      }).toThrowError('Invalid orientation')
    })

  })

  describe('instructRover()', () => {

    it('correctly instructs rover at given index', () => {
      const mockRover = {
        explore: jest.fn(),
        getLocation: jest.fn().mockReturnValue([1, 2])
      }
      plateau.rovers = [{}, mockRover]
      plateau.instructRover(1, 'MMLMR')
      expect(mockRover.explore).toHaveBeenCalledWith('MMLMR')
      expect(mockRover.getLocation).toHaveBeenCalledTimes(1)
    })

    it('correctly instructs rover at given index', () => {
      const mockRover = {
        explore: jest.fn(),
        getLocation: jest.fn().mockReturnValue([1, 2])
      }
      plateau.rovers = [{}, mockRover]
      plateau.instructRover(1, 'MMLMR')
      expect(mockRover.explore).toHaveBeenCalledWith('MMLMR')
      expect(mockRover.getLocation).toHaveBeenCalledTimes(1)
    })

    it('errors if no rover exists at given index', () => {
      plateau.rovers = []
      expect(() => {
        plateau.instructRover(0, 'MMLMR')
      }).toThrowError('No rover at index 0')
    })

    it('errors if no rover exists at given index', () => {
      const mockRover = {
        explore: jest.fn(),
        getLocation: jest.fn().mockReturnValue([7, 2])
      }
      plateau.rovers = [mockRover]
      expect(() => {
        plateau.instructRover(0, 'MMLMR')
      }).toThrowError('New rover location exceeds boundaries of width 5, height 6')
    })

  })

  it('correctly prints rover locations when printRoverLocations() is called', () => {
    const oldLog = console.log
    console.log = jest.fn()
    plateau.rovers = [
      { getLocation: jest.fn().mockReturnValue([1, 2]), getOrientation: jest.fn().mockReturnValue('North') },
      { getLocation: jest.fn().mockReturnValue([5, 7]), getOrientation: jest.fn().mockReturnValue('West') }
    ]
    plateau.printRoverLocations()
    expect(console.log).toHaveBeenCalledWith('Rover locations:')
    expect(console.log).toHaveBeenCalledWith('%s %s %s', 1, 2, 'North')
    expect(console.log).toHaveBeenCalledWith('%s %s %s', 5, 7, 'West')
    console.log = oldLog
  })

})