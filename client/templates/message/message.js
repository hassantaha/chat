Template.message.events({
  "submit .new-msg": function (event, template) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var text = event.target.text.value;

    // Insert a discussion into the collection
    Meteor.call("addMsg", text, template.data._id);

    // Clear form
    event.target.text.value = "";
  },
  "click .delete": function (event, template) {

     var messageID = this.id;
      Meteor.call("deleteMsg", template.data._id, messageID);
    },
});


Template.message.helpers({
  isOwner: function () {
    return this.owner === Meteor.userId();
  },
  messages : function() {

  var contributors = this.contributors;
    
  var messages = this.messages.sort( function(a,b) {
      if( a.date > b.date ) return -1;
      if( a.date < b.date ) return 1;
      return 0;
    } );

  for( let message of messages ) {
    message.isSeen = false;
    for( let contributor of contributors ) {
      if( contributor.lastSeen > message.date ) {
        message.isSeen = true;
        break;
      }
    }
  }

  return messages
  },
  formattedDate : function() {
    return moment(this.date).calendar();
  },
});


