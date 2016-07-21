var Diorama = { //Delegates to GameWindow

	setup: function (game, x, y, width, height, scale = 1) {
		this.init(game, x, y, width, height, scale);
		this.background = this.add_sprite(
			0, 0, 'dioramabg'
		);

		this.leaves = [];
		this._spawn_leaves(-40, 50);
	},

	leaf_fall: function(lifetime) {
		_each_leaf(function check_for_falling(leaf) {
			if (leaf.lifetime < lifetime) {
				leaf.fall();
			}
		});
		leaves[Math.floor(Math.random() * leaves.length)].fall();
	},

	_each_leaf: function(fn) {
		leaves.forEach(function (leaf) {
			fn(leaf);
		});
	},

	_spawn_leaves: function(leaf_rate, leaf_weight) {
		shader_sprite = this.game.add.sprite(0, 0, 'treeshader');
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
				
				
				var rate = leaf_rate; //modifies average number of leaves
				var weight = leaf_weight; //modifies lifespan of each leaf
				var color = shader.context.getImageData(x, y, w, h).data[0];
				var alpha = shader.context.getImageData(x, y, w, h).data[3];
				if (alpha == 255) {
					if (Math.floor(Math.random() * 255) > color - rate) {
						//add leaf
						this.leaves.push(new Leaf(
							(x * GAME_SCALE) + this.x,
							(y * GAME_SCALE) + this.y,
							Math.min(color + weight, 255)
						));
					}
				}
			}
		}

		shader_sprite.destroy();
	},
};

Object.setPrototypeOf(Diorama, ScreenArea);