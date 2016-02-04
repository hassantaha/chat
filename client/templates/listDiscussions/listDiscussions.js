Template.listDiscussions.events({
	"click .image": function (event, template) {
      
      Router.go('discussion');
  	},

  	"click .list": function (event, template) {
      
      Router.go('/discussions/'+this._id);
      Meteor.call("editLastSeen", this._id, Meteor.userId());
      	
  	},


    
});

Template.listDiscussions.helpers({
  isOwner: function () {
    return this.owner === Meteor.userId();
  },
  listDiscussions: function () {
    
      return Discussions.find({ contributors: { $elemMatch: { id: Meteor.userId() } } }, {sort: {createdAt: -1}});
    
  },
  configureHammer: function () {
    return function (hammer, templateInstance) {
      var swipeleft = new Hammer.Swipe({
        event: 'swipeleft', /* prefix for custom swipe events, e.g. 2fingerswipeleft, 2fingerswiperight */
        velocity: 1
      });
      hammer.add(swipeleft);
      return hammer;
    }
  },
  map1: {
    'swipeleft .list-discussions': function (event, template) {
      
      Router.go('discussion');
    }
  }
});


Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
