var Board = (function () {

	var exports = {};
	
	//Public//

	exports.init = function() {
		border = new Phaser.BitmapData(game, 'border', BOARD_WIDTH, BOARD_HEIGHT);
		border.fill(180, 180, 230);
		game.add.sprite(BOARD_OFFSET_X, BOARD_OFFSET_Y, border);
	}

	exports.occupied = function(x, y) {
		//return true if tile at [x, y] is occupied
	};
	exports.unoccupied = function(x, y) {
		return !this.occupied(x, y);
	};
	exports.clear_line = function(y) {
		//magic
	};

	//Private//

	var new_matrix = function () {
		this.board_matrix = new Array(this.BOARD_HEIGHT);
		for (var y = 0; y < this.BOARD_HEIGHT; y++) {
			this.board_matrix[y] = new Array(this.BOARD_WIDTH);
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