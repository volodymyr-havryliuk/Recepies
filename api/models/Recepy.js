/* eslint-disable linebreak-style */
/**
 * Recepy.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes:{
    dishTitle: {type: 'string', required: true},
    ingredients: {type: 'string', required: true},
    instructions: { type: 'string', required: true },
    calories: {type: 'number'},
  },
};
