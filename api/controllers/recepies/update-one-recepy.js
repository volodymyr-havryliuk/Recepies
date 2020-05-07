module.exports = {


  friendlyName: 'Update one recepy',


  description: `Update a recepy`,


  inputs: {

    id: {
      description: 'The id of the recepy to destroy',
      type: 'number',
      required: true
    },

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

    notFound: {
      responseType: 'notFound'
    },

    forbidden: {
      responseType: 'forbidden'
    },

  },


  fn: async function ({ id, dishTitle, ingredients, instructions, calories }) {

    var recepyToUpdate = await Recepy.findOne({ id });

    if (!recepyToUpdate){
      throw 'notFound';
    }

    await Recepy.update({ id })
    .set({
      dishTitle: dishTitle,
      ingredients: ingredients,
      instructions: instructions,
      calories: calories
    });

  }


};
