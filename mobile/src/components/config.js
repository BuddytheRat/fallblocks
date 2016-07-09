var TILE_WIDTH        = 16,
	TILE_HEIGHT       = 15,
	BOARD_TILE_WIDTH  = 10,
	BOARD_TILE_HEIGHT = 20,
	BOARD_WIDTH       = BOARD_TILE_WIDTH * TILE_WIDTH,
	BOARD_HEIGHT      = BOARD_TILE_HEIGHT * TILE_HEIGHT,
	BOARD_OFFSET_X    = 0,
	BOARD_OFFSET_Y    = 0,
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
		i: { shape: [0x0F00, 0x2222, 0x00F0, 0x4444], color: '0099ee' }, 
		j: { shape: [0x44C0, 0x8E00, 0x6440, 0x0E20], color: '0000ff' },
		l: { shape: [0x4460, 0x0E80, 0xC440, 0x2E00], color: 'ffbb00' },
		o: { shape: [0xCC00, 0xCC00, 0xCC00, 0xCC00], color: 'ddff00' },
		s: { shape: [0x06C0, 0x8C40, 0x6C00, 0x4620], color: '00ff00' },
		t: { shape: [0x0E40, 0x4C40, 0x4E00, 0x4640], color: 'ff00ff' },
		z: { shape: [0x0C60, 0x4C80, 0xC600, 0x2640], color: 'ff0000' }
	};