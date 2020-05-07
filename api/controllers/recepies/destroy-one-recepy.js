module.exports = {


  friendlyName: 'Destroy one recepy',


  description: 'Delete a recepy that you no longer want to share.',


  inputs: {
    id: {
      description: 'The id of the recepy to destroy',
      type: 'string',
      required: true
    }
  },


  exits: {
    notFound: {
      responseType: 'notFound'
    },

    forbidden: {
      responseType: 'forbidden'
    },
  },


  fn: async function ({ id }) {

    var recepyToDestroy = await Recepy.find({ id });
    if (!recepyToDestroy){
      throw 'notFound';
    }
    //Todo: Verify permissions

    // Archive the record
    await Recepy.archiveOne({ id });
  }


};
