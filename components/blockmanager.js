var BlockManager = (function () {
	//Then God said "Let there be straight pieces",
	//and there were straight pieces.

	var exports = {};

	//Public//

	exports.init = function () {
		new_pool();
	};

	exports.new_block = function (x, y) {
		var block = get_next_block();
		blocks.unshift(new Block(x, y, block.shape, block.color));
		if (block_pool.length == 0) { new_pool(); }
		return blocks[0];
	};

	exports.drop_lines = function(y) {
		each_tile(function move_down(tile) {
			if (tile.y < y) {
				tile.move(0, 1);
			}
		});
	};

	exports.remove_tiles = function(y) {
		each_tile(function destroy_tile(tile) {
			if (tile.y == y) {
				tile.kill();
			}
		});
	};

	//Private//
	var blocks = [];
	var block_pool = [];

	//BLOCK POOL//
	var new_pool = function () {
		//create list of keys for BLOCKS object.
		for (var block in BLOCKS) {
			for (var i = 0; i < 4; i++) {
				block_pool.push(BLOCKS[block]);
			}
		};
	};

	var get_next_block = function () {
		//get random block from pool.
		var rand = Math.floor(Math.random() * block_pool.length - 1);
		return block_pool.splice(rand, 1)[0];
	};

	var each_tile = function(fn) {
		blocks.forEach(function get_tiles(block) {
			block.tiles.forEach(function drop_tiles(tile) {
				fn(tile)
			});
		});
	}

	return exports;
}());
