var Board = (function () {

	var exports = {};
	
	//Public//

	exports.init = function() {
		border = new Phaser.BitmapData(game, 'border', BOARD_WIDTH, BOARD_HEIGHT);
		border.fill(180, 180, 230);
		game.add.sprite(BOARD_OFFSET_X, BOARD_OFFSET_Y, border);
		new_matrix();
	}

	exports.occupied = function(coords, offset = [0, 0]) {
		//check list of coords for collision.
		for (var xy in coords) {
			coords[xy][0] += offset[0];
			coords[xy][1] += offset[1];
			
			if (board_matrix[coords[xy][0]][coords[xy][1]]) { //Blocks
				return true;
			} else if (coords[xy][1] > BOARD_TILE_HEIGHT) {	//Floor
				return true;
			} else if (coords[xy][0] < 0 || coords[xy][1] > BOARD_TILE_WIDTH) { //Walls
				return true;
			}
		}
		return false;
	};
	exports.unoccupied = function(coords) {
		return !this.occupied(coords);
	};
	exports.place_block = function(coords) {
		for (var xy in coords) {
			board_matrix[coords[xy][0]][coords[xy][1]] = 1;
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
		board_matrix = new Array(this.BOARD_HEIGHT);
		for (var y = 0; y < this.BOARD_HEIGHT; y++) {
			board_matrix[y] = new Array(this.BOARD_WIDTH);
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