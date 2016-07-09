var TILE_WIDTH        = 8,
	TILE_HEIGHT       = 8,
	BOARD_TILE_WIDTH  = 10,
	BOARD_TILE_HEIGHT = 20,
	GAME_SCALE        = 3,
	DIORAMA_WIDTH     = 64 * GAME_SCALE,
	BOARD_WIDTH       = BOARD_TILE_WIDTH * TILE_WIDTH * GAME_SCALE,
	BOARD_HEIGHT      = BOARD_TILE_HEIGHT * TILE_HEIGHT * GAME_SCALE,
	BOARD_OFFSET_X    = 10,
	BOARD_OFFSET_Y    = 10,
	KEYS              = {
		'rotate_cw' : ['UP', 'W', 'X'],
		'rotate_ccw': ['DOWN', 'Z'],
		'drop'      : ['SPACE', 'C'],
		'left'      : ['LEFT', 'A'],
		'right'     : ['RIGHT', 'D'],
		'debug'     : ['N'],
		'hax'       : ['H']
	},
	BLOCKS = {
		i: { shape: [0x0F00, 0x2222, 0x00F0, 0x4444], color: 'ccc627' }, 
		j: { shape: [0x44C0, 0x8E00, 0x6440, 0x0E20], color: 'c74a20' },
		l: { shape: [0x4460, 0x0E80, 0xC440, 0x2E00], color: 'bb8800' },
		o: { shape: [0xCC00, 0xCC00, 0xCC00, 0xCC00], color: 'bfb971' },
		s: { shape: [0x06C0, 0x8C40, 0x6C00, 0x4620], color: 'ff802b' },
		t: { shape: [0x0E40, 0x4C40, 0x4E00, 0x4640], color: '778800' },
		z: { shape: [0x0C60, 0x4C80, 0xC600, 0x2640], color: 'c9964f' }
	};

var GAME_WIDTH = BOARD_WIDTH + (BOARD_OFFSET_X * 3) + DIORAMA_WIDTH,
	GAME_HEIGHT = BOARD_HEIGHT + (BOARD_OFFSET_Y * 2) 