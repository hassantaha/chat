Template.searchResult.helpers({
  discussions: function () {

    if (Session.get('search/keyword')) {

      var regexp = new RegExp(Session.get('search/keyword'), 'i');
      return Discussions.find({text: regexp});

    }else {
      return Discussions.find();

    }
    
  }
});

Template.searchBox.events({
  'keyup #search': function(event) {
    Session.set('search/keyword', event.target.value);
  }
});