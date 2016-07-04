var Board = (function () {

	var exports = {};
	
	//Public//
	
	exports.init = function() {
		border = new Phaser.BitmapData(game, 'border', BOARD_WIDTH, BOARD_HEIGHT);
		border.fill(180, 180, 230);
		game.add.sprite(BOARD_OFFSET_X, BOARD_OFFSET_Y, border);
		new_matrix();
		draw_grid();
	}

	exports.occupied = function (tiles, offset = [0, 0, 0]) {
		//check list of coords for collision.
		for (var xy in tiles) {
			tiles[xy][0] += offset[0];
			tiles[xy][1] += offset[1];
			if (tiles[xy][1] > BOARD_TILE_HEIGHT - 1) { //Floor
				return true;
			} else if (tiles[xy][0] < 0 || tiles[xy][0] > BOARD_TILE_WIDTH - 1) { //Walls
				return true;
			} else if (tiles[xy][1] < 0) {
				//do nothing. block is in spawn area.
			} else if (board_matrix[tiles[xy][1]][tiles[xy][0]] == 1) { //Blocks
				return true;
			}
		}
		return false;
	}
	exports.unoccupied = function(tiles, offset = [0, 0]) {
		return !this.occupied(tiles, offset);
	};
	exports.place_block = function(tiles) {
		//swap coords here
		for (var xy in tiles) {
			board_matrix[tiles[xy][1]][tiles[xy][0]] = 1;
		}
	}

	exports.check_lines = function() {
		var filled = [];
		for (var y = 0; y < BOARD_TILE_HEIGHT; y++) {
			if (board_matrix[y].indexOf(0) == -1) {
				filled.push(y);
			}
		}
		return filled;
	}

	exports.clear_line = function(y) {
		// y is row to clear,
		board_matrix.splice(y, 1);
		new_line();
	};

	exports.matrix_debug = function () {
		console.log(board_matrix);
	}

	//Private//
	

	var board_matrix = [];

	var new_line = function() {
		board_matrix.unshift(new Array(BOARD_TILE_WIDTH));
		for (var x = 0; x < BOARD_TILE_WIDTH; x++) {
			board_matrix[0][x] = 0;
		}
	}

	var new_matrix = function () {
		board_matrix = new Array();
		for (var y = 0; y < BOARD_TILE_HEIGHT; y++) {
			new_line();
		}
	};

	var draw_grid = function () {
		var color = "#99b";

		for (var i = 1; i <= BOARD_TILE_WIDTH - 1; i++) {
			var line = new Phaser.Line(
				BOARD_OFFSET_X + (TILE_WIDTH * i),
				BOARD_OFFSET_Y,
				BOARD_OFFSET_X + (TILE_WIDTH * i),
				BOARD_OFFSET_Y + BOARD_HEIGHT
			);
			game.debug.geom(line, color);
		}
		for (var i = 1; i <= BOARD_TILE_HEIGHT - 1; i++) {
			var line = new Phaser.Line(
				BOARD_OFFSET_X,
				BOARD_OFFSET_Y + (TILE_HEIGHT * i),
				BOARD_OFFSET_X + BOARD_WIDTH,
				BOARD_OFFSET_Y + (TILE_HEIGHT * i)
			);
			game.debug.geom(line, color);
		}

	};

	return exports;

}());