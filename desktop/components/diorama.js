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

	exports.leaf_fall = function(lifetime) {
		each_leaf(function check_for_falling(leaf) {
			if (leaf.lifetime < lifetime) {
				leaf.fall();
			}
		});
		leaves[Math.floor(Math.random() * leaves.length)].fall();
	};

	//Private//
	//top left corner of diorama
	var corner_x = BOARD_WIDTH + (BOARD_OFFSET_X * 2);
	var corner_y = BOARD_OFFSET_Y;
	var leaves = [];

	var each_leaf = function(fn) {
		leaves.forEach(function (leaf) {
			fn(leaf);
		});
	}

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
				var w = shader.width;
				var h = shader.height;
				
				
				var rate = -40; //modifies average number of leaves
				var weight = 50;
				var color = shader.context.getImageData(x, y, w, h).data[0];
				var alpha = shader.context.getImageData(x, y, w, h).data[3];
				if (alpha == 255) {
					if (Math.floor(Math.random() * 255) > color - rate) {
						//add leaf
						leaves.push(new Leaf(
							(x * GAME_SCALE) + corner_x,
							(y * GAME_SCALE) + corner_y,
							Math.min(color + weight, 255)
						));
					}
				}
			}
		}

		shader_sprite.destroy();
	};



	return exports;

})();