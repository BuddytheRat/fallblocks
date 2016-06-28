var TILE_WIDTH        = 16,
	TILE_HEIGHT       = 16,

	BOARD_TILE_WIDTH  = 10,
	BOARD_TILE_HEIGHT = 20,
	BOARD_WIDTH       = BOARD_TILE_WIDTH * TILE_WIDTH,
	BOARD_HEIGHT      = BOARD_TILE_HEIGHT * TILE_HEIGHT,
	BOARD_OFFSET_X    = 10,
	BOARD_OFFSET_Y    = 10,
	KEYS              = {
		'rotate_cw' : ['UP', 'W', 'X'],
		'rotate_ccw': ['DOWN', 'Z'],
		'drop'      : ['SPACE'],
		'left'      : ['LEFT', 'A'],
		'right'     : ['RIGHT', 'D'],
	};