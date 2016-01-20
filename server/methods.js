Meteor.methods({
  getUsers: function(){

    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    return Meteor.users.find().fetch();

  },
  addDiscussion: function (text, usersIDs) {

    var list = [];
    for(var i = 0; i < usersIDs.length; i++) {
      list.push({ id : usersIDs[i], lastSeen : null });
    }
    // Make sure the user is logged in before inserting a discussion
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Discussions.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
      contributors : list,
      messages : []
    });
  },

  addMsg: function (text, discussionID) {
    // Make sure the user is logged in before inserting a discussion
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
 
    Discussions.update({_id : discussionID},{
      $push : { messages : { 
        id : Random.id(),
        content : text,
        author : Meteor.userId(),
        authorName : Meteor.user().username,
        date : new Date() 
      } }
    });
  },

  deleteMsg: function (discussionID, messageID) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
 
    Discussions.update({_id : discussionID},{
      $pull : { messages : { id : messageID } }
    });
    
  },
});

