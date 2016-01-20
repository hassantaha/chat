Chat = {};

Meteor.subscribe("discussions");


Template.discussion.onCreated( function() { 
  Chat.createDiss = this;
  // error ReactiveVar does not exist
  this.users = new ReactiveVar([]);
  this.listUsers = new ReactiveVar([]);

  Meteor.call("getUsers", function (err, result) {
    if(Chat.createDiss && !err)
      Chat.createDiss.users.set(result);  
  });
});

Template.discussion.onDestroyed( function(){ 
  Chat.createDiss = null;
  this.listUsers = null;
});
  

Template.body.helpers({
  
  
});

Template.body.events({
  

});

Template.discussion.events({
  "change .css-checkbox": function (event, template) {
      
      // Vu que c'est une variable réactive, il faut utiliser les get/set
      // Penser à gérer la sélection et la déselection.
      var listUsers = template.listUsers.get();
      if ( event.target.checked ) {
        
      listUsers.push(this._id);         
      }
      listUsers.push(Meteor.userId());
      template.listUsers.set(listUsers);

    },

    "submit .new-discussion": function (event, template) {
      event.preventDefault();
      var listUsers = template.listUsers.get();

      var text = event.target.text.value;

      // Insert a discussion into the collection
      Meteor.call("addDiscussion", text, listUsers);

      // Clear form
    event.target.text.value = "";

    },
});


Template.discussion.helpers({
  isOwner: function () {
    return this.owner === Meteor.userId();
  },
  discussions: function () {
    
      return Discussions.find({ contributors: { $elemMatch: { id: Meteor.userId() } } }, {sort: {createdAt: -1}});
    
  },
  users: function () { 
      return Template.instance().users.get();
  },
});


Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
