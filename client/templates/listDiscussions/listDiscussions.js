Template.listDiscussions.events({
  
});


Template.listDiscussions.helpers({
  isOwner: function () {
    return this.owner === Meteor.userId();
  },
  listDiscussions: function () {
    
      return Discussions.find({ contributors: { $elemMatch: { id: Meteor.userId() } } }, {sort: {createdAt: -1}});
    
  },
});


Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
