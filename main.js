var mainState = {
	preload: function() {
		//load images and sounds
	},

	create: function() {
		//setup game, display starting sprites, etc.
		game.stage.backgroundColor = "#667"
;
		Controller.init();
		Board.init();
		BlockManager.init();

		this.block = BlockManager.new_block(0, -3);

		this.place_block = function() {
			Board.place_block(this.block.tile_coords());
			//Clear lines if filled.
			var cleared = Board.check_lines();
			if (cleared.length > 0) {
				for (var line in cleared) {
					Board.clear_line(cleared[line]);
					BlockManager.drop_lines(line);
				}
			}
			this.block = BlockManager.new_block(3, -3);
			Controller.set_timeout('drop', 10);
		};

		var gamestep = function () {
			//Move Down
			if (Board.unoccupied(this.block.tile_coords(), [0, 1])) {
				this.block.move(0, 1);
			//Place Block
			} else {
				this.place_block();
			}
		};
		var timer = game.time.events.loop(Phaser.Timer.SECOND, gamestep, this);

	},

	update: function() {
		//60 fps
		//game logic here

		//DEBUG//
		if(Controller.key_down('debug')) {
			Board.matrix_debug();
		}

		//BLOCK CONTROL//
		if (Controller.key_down('rotate_cw', 10)) {
			this.block.rotate_cw();
			// Rotate, then check for collisions,
			// including adjacent placements up to 2 away. 
			if (Board.occupied(this.block.tile_coords())) {
				if (Board.unoccupied(this.block.tile_coords(), [-1, 0])) {
					this.block.move(-1, 0);
				} else if (Board.unoccupied(this.block.tile_coords(), [1, 0])) {
					this.block.move(1, 0);	
				} else if (Board.unoccupied(this.block.tile_coords(), [-2, 0])) {
					this.block.move(-2, 0);	
				} else if (Board.unoccupied(this.block.tile_coords(), [2, 0])) {
					this.block.move(2, 0);	
				} else {
					this.block.rotate_ccw();
				}
			}
		}
		if (Controller.key_down('rotate_ccw', 10)) {
			this.block.rotate_cw();
			// Rotate, then check for collisions,
			// including adjacent placements up to 2 away. 
			if (Board.occupied(this.block.tile_coords())) {
				if (Board.unoccupied(this.block.tile_coords(), [-1, 0])) {
					this.block.move(-1, 0);
				} else if (Board.unoccupied(this.block.tile_coords(), [1, 0])) {
					this.block.move(1, 0);	
				} else if (Board.unoccupied(this.block.tile_coords(), [-2, 0])) {
					this.block.move(-2, 0);	
				} else if (Board.unoccupied(this.block.tile_coords(), [2, 0])) {
					this.block.move(2, 0);	
				} else {
					this.block.rotate_cw();
				}
			}
		}

		if (Controller.key_down('drop', 20)) {
			while (Board.unoccupied(this.block.tile_coords(), [0, 1])) {
				this.block.move(0, 1);
			}
			this.place_block();
		}
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