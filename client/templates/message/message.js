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

    return this.messages.sort( function(a,b) {
      if( a.date > b.date ) return -1;
      if( a.date < b.date ) return 1;
      return 0;
    } );
  },
  formattedDate : function() {
    return moment(this.date).calendar();
  },

  time : function(){

    var messages = this.messages;

    var contributors = this.contributors;

    var maxDate = -1, msg = "nonVu";

    for( var i = 0; i < messages.length; i++ ) {
      if( maxDate < messages[i].date ) {
        maxDate = messages[i].date;
    
      }
    }

    for( var i = 0; i < contributors.length; i++ ) {
      if( maxDate < contributors[i].lastSeen ) {
        if(contributors[i].id === Meteor.userId()){
          msg="nonVu";
        }else{
          msg="vu";
        }
      }
    }

    return msg;
  }
});


