var Diorama = (function () {
	
	var exports = {};

	//Public//
	exports.init = function() {
		Diorama.bg = add_sprite(
			corner_x,
			corner_y,
			'dioramabg'
		);

		add_sprite(corner_x, corner_y, 'leaf');
	};

	//Private//
	var corner_x = BOARD_WIDTH + (BOARD_OFFSET_X * 2);
	var corner_y = BOARD_OFFSET_Y;
	var scale_x = scale_y = 3;

	var add_sprite = function(x, y, key) {
		var sprite = game.add.sprite(x, y, key);
		sprite.scale.setTo(GAME_SCALE, GAME_SCALE);
		return sprite;
	}

	var spawn_leaves = function() {

	}

	return exports;

})();