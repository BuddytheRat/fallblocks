var mainState = {
	preload: function() {
		//load images and sounds
	},

	create: function() {
		//setup game, display sprites, etc.
	},

	update: function() {
		//60 fps
		//game logic
	},
};

// Initialize Phaser
var game = new Phaser.Game(200, 340);

// Add 'mainState' and call it 'main'
game.state.add('main', mainState);

// Start the state. (Start the game.)
game.state.start('main');