/* eslint-disable linebreak-style */
module.exports={
  friendlyName: 'Upload recepy',
  description: 'Upload recepy so that it is visible for other users',
  inputs: {

    dishTitle: {
      description: 'Title of the dish.',
      type: 'string'
    },

    ingredients: {
      type: 'string',
      description: 'List of ingridients.'
    },

    instructions: {
      type: 'string',
      description: 'Instructions to prepare the dish.'
    },

    calories: {
      type: 'number',
      description: 'Calories per 100 g.'
    },
  },
  exits: {
    success: {
      outputDescription: 'The newly created `Recepy`.',
      outputExample: {}
    },

  },
  fn: async function ({ dishTitle, ingredients, instructions, calories }) {
    // Create a new "recepy" record.
    var newRecepy = await Recepy.create({
      dishTitle: dishTitle,
      ingredients: ingredients,
      instructions: instructions,
      calories: calories
    }).fetch();

    // Return the newly-created thing, with its `imageSrc`
    return {
      id: newRecepy.id,
    };

  }


};
