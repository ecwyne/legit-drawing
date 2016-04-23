
Meteor.startup(function(){
  var board = new DrawingBoard.Board('board', {
    	controls: [
    		'Color',
    		{ Size: { type: 'dropdown' } },
    		{ DrawingMode: { filler: false } },
    		'Navigation',
    		'Download'
    	],
    	size: 1,
    	webStorage: 'session',
    	enlargeYourContainer: true
    });
    Meteor.board = board;
    board.ev.bind('board:stopDrawing', function(event){
      Boards.update(Boards.findOne()._id, {$set: {img: Meteor.board.getImg()}});
    });
    board.ev.bind('board:reset', function(event){
      Boards.update(Boards.findOne()._id, {$set: {img: Meteor.board.getImg()}});
    });
 
    
    Boards.find().observeChanges({
      changed: function (id, doc){
        Meteor.board.setImg(doc.img);
      }
    });
}); 