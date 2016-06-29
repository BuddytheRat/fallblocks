var mainState = {
	preload: function() {
		//load images and sounds
	},

	create: function() {
		//setup game, display starting sprites, etc.
		game.stage.backgroundColor = "#667";

		Controller.init();
		Board.init();
		BlockManager.init();

		this.block = BlockManager.new_block();
		this.block.new_pos(3, 3);

		//this.tblock = BlockManager.new_block(blocks.t.shape);
		//this.tblock.create_block();
		//this.tblock.new_pos(2, 10);


		var gamestep = function () {
			if (Board.unoccupied(this.block.tile_coords(), [0, 1])) {
				this.block.move(0, 1);
			} else {
				this.block = BlockManager.new_block();
				this.block.new_pos(3, -4);
			}
		};
		var timer = game.time.events.loop(Phaser.Timer.SECOND, gamestep, this);

	},

	update: function() {
		//60 fps
		//game logic here
		if (Controller.key_down('rotate_cw', 10)) {
			if (this.block.tile_coords(1))
			this.block.rotate_cw(); 
		}
		if (Controller.key_down('rotate_ccw', 10)) { this.block.rotate_ccw(); }
		if (Controller.key_down('left', 5)) {
			if (Board.unoccupied(this.block.tile_coords(), [-1, 0])) { this.block.move(-1, 0); }
		}
		if (Controller.key_down('right', 5)) {
			if (Board.unoccupied(this.block.tile_coords(), [1, 0])) { this.block.move(1, 0); }
		}
	},
};

// Initialize Phaser
var game = new Phaser.Game(400, 340, Phaser.AUTO, 'game');
// Add 'mainState' and call it 'main'
game.state.add('main', mainState);
// Start the state. (Start the game.)
game.state.start('main');