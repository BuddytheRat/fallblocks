var BlockManager = (function () {
	//Then God said "Let there be straight pieces",
	//and there were straight pieces.

	var exports = {};

	//Public//

	exports.init = function () {
		new_pool();
	};

	exports.new_block = function (shape) {
		var block = new Block(BLOCKS[get_next_block()].shape);
		blocks_array.push(block);
		if (block_pool.length == 0) { new_pool(); }
		block.create_block();
		return block;
	};

	exports.drop_tiles = function(y) {
		for (block in blocks_array) {
			blocks_array[block].group.forEach(function(tile) {
				if (tile.tile_y <= y) {
					tile.y += TILE_HEIGHT;
				}
			});
		}
	};

	//Private//
	var blocks_array = [];
	var block_pool = [];

	//BLOCK POOL//
	var new_pool = function () {
		//create list of keys for BLOCKS object.
		for (var block in BLOCKS) {
			for (var i = 0; i <= 3; i++) {
				block_pool.push(block);
			}
		};
	};

	var get_next_block = function () {
		//get random block from pool.
		var rand = Math.floor(Math.random() * block_pool.length - 1);
		return block_pool.splice(rand, 1);
	};

	return exports;
}());
