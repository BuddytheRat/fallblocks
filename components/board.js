var Board = (function () {
	//

	var pub = {};

	//Public//

	pub.occupied = function(x, y) {
		//return true if tile at [x, y] is occupied
	};
	pub.unoccupied = function(x, y) {
		return !this.occupied(x, y);
	};
	pub.clear_line = function(y) {
		//magic
	};

	//Private//

	var BOARD_WIDTH = 10,
		BOARD_HEIGHT = 20,
		board_matrix = null;

	var new_matrix = function () {
		this.board_matrix = new Array(this.BOARD_HEIGHT);
		for (var y = 0; y < this.BOARD_HEIGHT; y++) {
			this.board_matrix[y] = new Array(this.BOARD_WIDTH);
		}
	};

	return pub;

}());