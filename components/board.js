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
			if (tiles[xy][1] > BOARD_TILE_HEIGHT) { //Floor
				return true;
			} else if (tiles[xy][0] < 0 || tiles[xy][0] > BOARD_TILE_WIDTH - 1) { //Walls
				return true;
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

	exports.clear_lines = function(y, num) {
		// y is top most row to clear,
		// num is number of rows.
		board_matrix.splice[y, num];
		for (var i = 0; i < num; i++) {
			board_matrix.unshift(new Array(this.BOARD_WIDTH));
		}
	};

	//Private//

	var board_matrix = [];

	var new_matrix = function () {
		board_matrix = new Array(BOARD_TILE_HEIGHT);
		for (var y = 0; y < BOARD_TILE_HEIGHT; y++) {
			board_matrix[y] = new Array(BOARD_TILE_WIDTH);
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