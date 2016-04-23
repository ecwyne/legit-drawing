Template.drawing.helpers({
  board: function(){
    return Boards.findOne(Router.current().params.id);
  }
})
Template.drawing.onRendered(function(){
  var snd = new Audio("http://soundbible.com/grab.php?id=1948&type=wav"); // buffers automatically when created
  var sne = new Audio("http://soundbible.com/grab.php?id=1463&type=wav")
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
      Boards.update(Router.current().params.id, {$set: {img: Meteor.board.getImg()}});
      sne.play()
    });
    board.ev.bind('board:reset', function(event){
      Boards.update(Router.current().params.id, {$set: {img: Meteor.board.getImg()}});
      snd.play();
    });
 
    
    Boards.find().observeChanges({
      changed: function (id, doc){
        console.log('checking', id, Router.current().params.id);
        if (id == Router.current().params.id){
          console.log(id);
          Meteor.board.setImg(Boards.findOne(id).img); 
        }
      }
    });
}); 