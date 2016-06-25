var Board = {

	BOARD_WIDTH: 10,
	BOARD_HEIGHT: 20,
	board_matrix: null,

	new_matrix: function () {
		this.board_matrix = new Array(this.BOARD_HEIGHT);
		for (var y = 0; y < this.BOARD_HEIGHT; y++;) {
			this.board_matrix[y] = new Array(this.BOARD_WIDTH);
		}
	},
	occupied: function(x, y) {
		//return true if tile at [x, y] is occupied
	},
	unoccupied: function(x, y) {
		return !occupied(x, y);
	},
	clear_line: function(y) {
		//magic
	},
};