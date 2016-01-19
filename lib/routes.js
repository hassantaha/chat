Router.route('/', {
    template: 'home'
});

Router.route('/discussion');
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

