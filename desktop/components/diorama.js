var Diorama = (function () {
	
	var exports = {};

	//Public//
	exports.init = function(shader) {
		Diorama.bg = game.add.sprite(
			corner_x,
			corner_y,
			'dioramabg'
		);

		Diorama.bg.scale.setTo(GAME_SCALE, GAME_SCALE);

		spawn_leaves();
	};

	//Private//
	//top left corner of diorama
	var corner_x = BOARD_WIDTH + (BOARD_OFFSET_X * 2);
	var corner_y = BOARD_OFFSET_Y;

	var spawn_leaves = function() {
		shader_sprite = game.add.sprite(0, 0, 'treeshader');
		var shader = new Phaser.BitmapData(
			game, 
			'bitmapshader',
			shader_sprite.width,
			shader_sprite.height
		);
		shader.draw(shader_sprite).update();

		for (var x = 0; x < shader.width; x++) {
			for (var y = 0; y < shader.height; y++) {
				var rate = 0; //modifies average number of leaves
				var red = shader.context.getImageData(
					x, 
					y, 
					shader.width, 
					shader.height
				).data[0];
				var alpha = shader.context.getImageData(
					x, 
					y, 
					shader.width, 
					shader.height
				).data[3];

				if ((Math.floor(Math.random() * 255) > red - rate) && alpha == 255) {
					//add leaf
					new Leaf(
						(x * GAME_SCALE) + corner_x,
						(y * GAME_SCALE) + corner_y,
						red
					);
				}
			}
		}

		shader_sprite.destroy();
	}

	return exports;

})();