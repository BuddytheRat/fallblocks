var TILE_WIDTH        = 16,
	TILE_HEIGHT       = 16,
	BOARD_TILE_WIDTH  = 10,
	BOARD_TILE_HEIGHT = 20,
	BOARD_WIDTH       = BOARD_TILE_WIDTH * TILE_WIDTH,
	BOARD_HEIGHT      = BOARD_TILE_HEIGHT * TILE_HEIGHT,
	BOARD_OFFSET_X    = 10,
	BOARD_OFFSET_Y    = 10;

var mainState = {
	preload: function() {
		//load images and sounds
	},

	create: function() {
		//setup game, display starting sprites, etc.
		game.stage.backgroundColor = "#667";

		var blocks = {
			i: { shape: [0x0F00, 0x2222, 0x00F0, 0x4444], color: 'cyan' },
			j: { shape: [0x44C0, 0x8E00, 0x6440, 0x0E20], color: 'blue' },
			l: { shape: [0x4460, 0x0E80, 0xC440, 0x2E00], color: 'orange' },
			o: { shape: [0xCC00, 0xCC00, 0xCC00, 0xCC00], color: 'yellow' },
			s: { shape: [0x06C0, 0x8C40, 0x6C00, 0x4620], color: 'green' },
			t: { shape: [0x0E40, 0x4C40, 0x4E00, 0x4640], color: 'purple' },
			z: { shape: [0x0C60, 0x4C80, 0xC600, 0x2640], color: 'red' }
		};

		Board.init();
		this.zblock = BlockManager.new_block(blocks.i.shape);
		this.zblock.create_block();
		this.zblock.new_pos(4, 5);


		var ticktock = function () {
			this.zblock.rotate_cw();
		};
		game.time.events.loop(Phaser.Timer.SECOND, ticktock, this);
	},

	update: function() {
		//60 fps
		//game logic here
	},
};

// Initialize Phaser
var game = new Phaser.Game(400, 340, Phaser.AUTO, 'game');
// Add 'mainState' and call it 'main'
game.state.add('main', mainState);
// Start the state. (Start the game.)
game.state.start('main');