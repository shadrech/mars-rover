import 'core-js/stable'
import 'regenerator-runtime/runtime'
import prompts from 'prompts'

import Plateau from './models/Plateau'

(async () => {
  console.log('Welcome to Mars Rover™.')

  const { height, width } = await prompts([{
    type: 'text',
    name: 'width',
    message: 'How wide is the Plateau?'
  }, {
    type: 'text',
    name: 'height',
    message: 'How high is the Plateau?'
  }]);

  let roverIndex = 0
  const plateau = new Plateau(width, height)
  while (true) {
    const { position, exploration, addAnotherRover } = await prompts([{
      type: 'text',
      name: 'position',
      message: 'Position of rover? e.g. "1 2 North"'
    }, {
      type: 'text',
      name: 'exploration',
      message: 'Exploration ("M" = move, "R" = rotate right, "L" = rotate left): '
    }, {
      type: 'select',
      name: 'addAnotherRover',
      message: 'Add another Rover?',
      choices: [
        { title: 'Yes', value: true },
        { title: 'No', value: false }
      ]
    }]);
    
    plateau.addRover(position)
    plateau.instructRover(roverIndex, exploration)
    if (!addAnotherRover) break

    roverIndex++
  }

  plateau.printRoverLocations()

})();