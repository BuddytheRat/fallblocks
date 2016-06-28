var mainState = {
	preload: function() {
		//load images and sounds
	},

	create: function() {
		//setup game, display starting sprites, etc.
		game.stage.backgroundColor = "#667";

		Board.init();
		Controller.init();
		Controller.add_keys(KEYS);
		BlockManager.init();

		this.randomblock = BlockManager.new_block();
		this.randomblock.new_pos(3, -4);

		//this.tblock = BlockManager.new_block(blocks.t.shape);
		//this.tblock.create_block();
		//this.tblock.new_pos(2, 10);


		var gamestep = function () {
			this.randomblock.move(0, 1);
		};
		var timer = game.time.events.loop(Phaser.Timer.SECOND, gamestep, this);

	},

	update: function() {
		//60 fps
		//game logic here
		if (Controller.key_down_once('up')) {
			this.randomblock.rotate_cw();
		}
	},
};

// Initialize Phaser
var game = new Phaser.Game(400, 340, Phaser.AUTO, 'game');
// Add 'mainState' and call it 'main'
game.state.add('main', mainState);
// Start the state. (Start the game.)
game.state.start('main');