var mainState = {
	preload: function() {
		//load images and sounds
	},

	create: function() {
		//setup game, display sprites, etc.
		
		//Example block creation
		//var block_texture = new Phaser.BitmapData(game, 'block', 16, 16);
		//block_texture.fill(200, 50, 50);
		//var block = game.add.sprite(100, 170, block_texture);

		create_block(3, 3, blocks.t, 0);
		create_block(3, 7, blocks.z, 0);
		create_block(3, 11, blocks.i, 1);
		create_block(3, 15, blocks.i, 0);
	},

	update: function() {
		//60 fps
		//game logic
	},
};

var TILE_WIDTH = TILE_HEIGHT = 16;
var blocks = {
	i: { blocks: [0x0F00, 0x2222, 0x00F0, 0x4444], color: 'cyan' },
	j: { blocks: [0x44C0, 0x8E00, 0x6440, 0x0E20], color: 'blue' },
	l: { blocks: [0x4460, 0x0E80, 0xC440, 0x2E00], color: 'orange' },
	o: { blocks: [0xCC00, 0xCC00, 0xCC00, 0xCC00], color: 'yellow' },
	s: { blocks: [0x06C0, 0x8C40, 0x6C00, 0x4620], color: 'green' },
	t: { blocks: [0x0E40, 0x4C40, 0x4E00, 0x4640], color: 'purple' },
	z: { blocks: [0x0C60, 0x4C80, 0xC600, 0x2640], color: 'red' }
};

var tile_pos = function (x, y) {
	return [x * TILE_WIDTH, y * TILE_HEIGHT];
}

var create_block = function (x, y, block, dir) {
	var bit, orig_x = x, blocks = block.blocks[dir];
	for ( bit = 0x8000; bit > 0; bit = bit >> 1 ) {
		if (blocks & bit) {
			var block_texture = new Phaser.BitmapData(game, 'block', TILE_WIDTH, TILE_HEIGHT);
			block_texture.fill(200, 30, 30);
			game.add.sprite(tile_pos(x, y)[0], tile_pos(x, y)[1], block_texture);
		}
		if (++x == orig_x + 4) {
			x = orig_x;
			++y;
		}
	}
};

// Initialize Phaser
var game = new Phaser.Game(200, 340, Phaser.AUTO, 'game');
// Add 'mainState' and call it 'main'
game.state.add('main', mainState);
// Start the state. (Start the game.)
game.state.start('main');4