var mainState = {
	preload: function() {
		//set game scaling
		game.stage.smoothed = false;
		//load images and sounds
		game.load.image('dioramabg', 'img/craptree.png');
		game.load.image('treeshader', 'img/tree_shader.png');
		game.load.spritesheet('leaf', 'img/leaves.png', 6, 5);
		game.load.audio('piano', 'audio/sad_day.mp3');
	},

	create: function() {
		//setup game, display starting sprites, etc.
		game.stage.backgroundColor = "#667"

		Diorama.init();
		Controller.init();
		Board.init();
		BlockManager.init();

		var music = game.add.audio('piano');
		music.play();

		this.block = BlockManager.new_block(3, -3);

		this.place_block = function() {
			Board.place_block(this.block.tile_coords());
			//Clear lines if filled.
			var lines = Board.check_lines();
			if (lines.length > 0) {
				lines.forEach(function clear_line(line) {
					Board.clear_line(line);
					BlockManager.remove_tiles(line);
					BlockManager.drop_lines(line);
				});
			}
			this.block = BlockManager.new_block(3, -3);
			Controller.set_timeout('drop', 5);
		};

		var gamestep = function () {
			var lifetime = Math.floor((((music.currentTime / 1000) * 255) / music.totalDuration));
			Diorama.leaf_fall(lifetime);
			//Move Down
			if (Board.unoccupied(this.block.tile_coords(), [0, 1])) {
				this.block.move(0, 1);
			//Place Block
			} else {
				this.place_block();
			}
		};
		var timer = game.time.events.loop(600, gamestep, this);

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

	render: function() {
		BlockManager.scale_tiles();
	},
};

// Initialize Phaser
var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'game');
// Add 'mainState' and call it 'main'
game.state.add('boot', bootState);
game.state.add('main', mainState);
// Start the state. (Start the game.)
game.state.start('main');