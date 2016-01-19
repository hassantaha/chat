Meteor.publish("discussions", function () {
  return Discussions.find({
    $or: [
      { private: {$ne: true} },
      { owner: this.userId }
    ]
  });
});
