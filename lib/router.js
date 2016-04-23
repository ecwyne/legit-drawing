Router.route('/', function () {
  this.render('rooms');
});

Router.route('/board/:id', function(){
    this.subscribe('board-by-id', this.params.id);
    this.render('drawing'); 
});