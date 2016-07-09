var Diorama = (function () {
	
	var exports = {};

	//Public//
	exports.init = function() {
		Diorama.bg = add_sprite(
			corner_x,
			corner_y,
			'dioramabg'
		);

		spawn_leaves();
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
		for (var x = 0; x < 40; x++) {
			for (var y = 0; y < 60; y++) {
				if (Math.random() > .7) {
					rand_x = Math.floor(Math.random() * 58 * GAME_SCALE);
					var spawned_sprite = add_sprite(
						corner_x + (rand_x), 
						corner_y + (y * GAME_SCALE), 
						'leaf'
					);
					spawned_sprite.frame = Math.floor(Math.random() * 25);
				}
			}
		}
	}

	return exports;

})();