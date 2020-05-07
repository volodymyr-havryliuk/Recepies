parasails.registerPage('available-recepies', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    recepies: [],


    // The "virtual" portion of the URL which is managed by this page script.
    virtualPageSlug: '',

    // Form data
    uploadFormData: {
      dishTitle: '',
      ingredients: '',
      instructions: '',
      calories: 0
    },

    // Modals which aren't linkable:
    confirmDeleteRecepyModalOpen: false,
    updateRecepyModalOpen: false,

    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `formData`.
    formErrors: { /* … */ },

    // Syncing / loading state
    syncing: false,

    // Server error state
    cloudError: '',
    selectedRecepy: undefined,
  },
  virtualPages: true,
  html5HistoryMode: 'history',
  virtualPagesRegExp: /^\/recepies\/?([^\/]+)?/,
  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    this.recepies = this._marshalEntries(this.recepies);
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    _marshalEntries: function(entries){
      return _.map(entries, (entry)=>{
        return entry;
      });
    },

    _clearUploadRecepyModal: function(){
      //Close modal
      this.goto('/recepies');
      //Reset form data
      this.uploadFormData = {
        dishTitle: '',
        ingredients: '',
        instructions: '',
        calories: 0
      };
      //Clear error states
      this.formErrors = {};
      this.cloudError = '';
    },

    clickAddButton: function(){
      this.goto('/recepies/new');
    },

    closeUploadRecepyModal: function(){
      this._clearUploadRecepyModal();
    },

    handleParsingUploadRecepyForm: function(){
      //Clear out any preexisting error message
      this.formErrors = {};

      var argins = this.uploadFormData;

      if (!argins.dishTitle) {
        this.formErrors.dishTitle = true;
      }
      if (!argins.ingredients) {
        this.formErrors.ingredients = true;
      }
      if (!argins.instructions) {
        this.formErrors.instructions = true;
      }
      if (!argins.calories) {
        argins.calories = 0;
      }

      if(Object.keys(this.formErrors).length>0){
        return;
      }

      return argins;
    },

    submittedUploadRecepyForm: function(result){
      var newRecepy = _.extend(result, {
        dishTitle: this.uploadFormData.dishTitle,
        ingredients: this.uploadFormData.ingredients,
        instructions: this.uploadFormData.instructions,
        calories: this.uploadFormData.calories
      });

      //Add the new recepy to the list
      this.recepies.unshift(newRecepy);

      //Close the modal
      this._clearUploadRecepyModal();
    },


    clickUpdateRecepy: function(recepyId){
      this.selectedRecepy = _.find(this.recepies, { id: recepyId });
      // Open the modal.
      this.updateRecepyModalOpen = true;
    },

    closeUpdateRecepyModal: function(){
      this.selectedRecepy = undefined;
      this.updateRecepyModalOpen = false;
      this.cloudError = '';
    },

    handleUpdateRecepyReturnForm: function (){
      //Clear out any preexisting error message
      this.formErrors = {};

      var argins = this.selectedRecepy;

      if (!argins.dishTitle) {
        this.formErrors.dishTitle = true;
      }
      if (!argins.ingredients) {
        this.formErrors.ingredients = true;
      }
      if (!argins.instructions) {
        this.formErrors.instructions = true;
      }
      if (!argins.calories) {
        argins.calories = 0;
      }

      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      return argins;
    },

    submittedUpdateRecepyForm: function(){
      // Close the modal.
      this.selectedRecepy = undefined;
      this.confirmDeleteRecepyModalOpen = false;
    },

    clickDeleteRecepy: function (recepyId) {
      this.selectedRecepy = _.find(this.recepies, { id: recepyId });
      // Open the modal.
      this.confirmDeleteRecepyModalOpen = true;
    },

    closeDeleteRecepyModal: function () {
      this.selectedRecepy = undefined;
      this.confirmDeleteRecepyModalOpen = false;
      this.cloudError = '';
    },

    handleParsingDeleteRecepyForm: function () {
      return {
        id: this.selectedRecepy.id
      };
    },

    submittedDeleteRecepyForm: function () {

      // Remove the thing from the list
      _.remove(this.recepies, { id: this.selectedRecepy.id });

      // Close the modal.
      this.selectedRecepy = undefined;
      this.confirmDeleteRecepyModalOpen = false;
    },


  }
});
