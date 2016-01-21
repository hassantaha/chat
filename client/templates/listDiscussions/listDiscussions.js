Template.listDiscussions.events({
	"click .image": function (event, template) {
      
      Router.go('discussion');
  	},

  	"click .list": function (event, template) {
      
      Router.go('/discussions/'+this._id);
      	
  	},
  
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
