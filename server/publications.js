Meteor.publish('board-by-id', function(id){
    return Boards.find({_id: id});
});

Meteor.publish(null, function(){
    return Boards.find({}, {fields: {name: 1}}); 
});