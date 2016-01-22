Template.searchResult.helpers({
  discussions: function () {
    var regexp = new RegExp(Session.get('search/keyword'), 'i');
    return Discussions.find({text: regexp});
  }
});

Template.searchBox.events({
  'keyup #search': function(event) {
    Session.set('search/keyword', event.target.value);
  }
});