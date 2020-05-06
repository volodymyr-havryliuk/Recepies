/* eslint-disable linebreak-style */
module.exports = {
  friendlyName: 'View available recepies',
  description: 'Display "Recepies" page.',


  exits: {
    success: {
      viewTemplatePath: 'pages/recepies/available-recepies'
    }
  },


  fn: async function () {

    sails.log.debug('fn');
    // Get the list of recepies this user can see.
    var recepies = await Recepy.find();

    // Respond with view.
    return {
      currentSection: 'recepies',
      recepies: recepies,
    };

  }


};
