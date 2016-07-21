var Board = { //Delegates to GameWindow
	setup: function (game, x, y, width, height, scale = 1) {
		this.init(game, x, y, width, height, scale);
		var background = new Phaser.BitmapData(
			game, 
			'background', 
			this.pixel_width,
			this.pixel_height
		);
		background.fill(180, 180, 230);
		this.add_sprite(0, 0, background);
		this.board_matrix = [];
		this.board_tile_width = BOARD_TILE_WIDTH;
		this.board_tile_height = BOARD_TILE_HEIGHT;
		this.tile_width = TILE_WIDTH;
		this.tile_height = TILE_HEIGHT;

		this._populate_matrix();
		this._draw_grid();
	},

	_populate_matrix: function () {
		for (var y = 0; y < this.board_tile_height; y++) {
			this._new_line();
		}
	},

	_new_line: function () {
		this.board_matrix.unshift(new Array(this.board_tile_width));
		for (var x = 0; x < this.board_tile_width; x++) {
			this.board_matrix[0][x] = 0;
		}
	},

	_draw_grid: function () {
		var color = "#99d";

		for (var i = 1; i <= this.board_tile_width - 1; i++) {
			var line = new Phaser.Line(
				this.x + (this.tile_width * i * this.scale),
				this.y,
				this.x + (this.tile_width * i * this.scale),
				this.y + this.height
			);
			this.game.debug.geom(line, color);
		}
		for (var i = 1; i <= this.board_tile_height - 1; i++) {
			var line = new Phaser.Line(
				this.x,
				this.y + (this.tile_height * i * this.scale),
				this.x + this.width,
				this.y + (this.tile_height * i * this.scale)
			);
			this.game.debug.geom(line, color);
		}

	},

	occupied: function (tiles, offset = [0, 0]) {
		var collides = false;
		tiles.forEach(function check_collision(xy) {
			xy[0] += offset[0];
			xy[1] += offset[1];
			if (xy[1] > this.board_tile_height - 1) {
				//Floor
				collides = true;
			} else if (xy[0] < 0 || xy[0] > this.board_tile_width - 1) { 
				//Walls
				collides = true;
			} else if (xy[1] < 0) {
				//do nothing. block is in spawn area.
			} else if (this.board_matrix[xy[1]][xy[0]] == 1) { 
				//Other Blocks
				collides = true;
			}
		}, this);
		return collides;
	},

	unoccupied: function(tiles, offset = [0, 0]) {
		return !this.occupied(tiles, offset);
	},

	place_block: function(tiles) {
		//swap coords here
		tiles.forEach(function place_tile(xy){
			this.board_matrix[xy[1]][xy[0]] = 1;
		}, this);
	},

	check_lines: function() {
		var filled = [];
		for (var y = 0; y < this.board_tile_height; y++) {
			if (this.board_matrix[y].indexOf(0) == -1) {
				filled.push(y);
			}
		}
		return filled;
	},

	clear_line: function(y) {
		this.board_matrix.splice(y, 1);
		this._new_line();
	},
}

Object.setPrototypeOf(Board, ScreenArea);