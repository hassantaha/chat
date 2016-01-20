Router.route('/', {
    template: 'listDiscussions'
});

Router.route('/discussion');
Router.route('/listDiscussions');
Router.route('/addUser');

Router.configure({
    layoutTemplate: 'Main'
});

Router.route('/discussions/:_id', {
    template: 'message',
    data: function(){

    var currentDiscussion = this.params._id;
    return Discussions.findOne({ _id: currentDiscussion });
        
    }
});

