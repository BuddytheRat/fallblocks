var Block = function(shape, color) {
	this.shape = shape;
	this.dir = 0;
	this.color = color;
	this.x = this.y = 0;
	this.tiles = [];

	//create tiles
	this.each_tile_pos(this.x, this.y, 
		function create_tile(x, y, rx, ry) {
			this.tiles.push(new Tile(x+rx, y+ry, color));
		}
	);
};

//BLOCK AI//
Block.prototype.speak = function() {
	window.alert("Hello! I am a block!");
};

//MOVEMENT//
Block.prototype.rotate_cw = function() {
	this.dir += 1;
	if (this.dir > 3) { this.dir = 0 };
	this.new_pos(this.origin_x, this.origin_y);
};
Block.prototype.rotate_ccw = function() {
	this.dir -= 1;
	if (this.dir < 0) { this.dir = 3 };
	this.new_pos(this.origin_x, this.origin_y);
};
Block.prototype.move = function(x, y) {
	//moves block relative to current position
	this.new_pos(this.origin_x + x, this.origin_y + y);
};
//POSITIONING//
Block.prototype.new_pos = function(x, y) {
	//set block coordinates
	this.origin_x = x;
	this.origin_y = y;
	this.each_tile_pos();(x, y, this.place_tile.bind(this));
};
Block.prototype.place_tile = function(x, y, rx, ry, i) {
	//set tile coordinates
	this.group.children[i].x = tile_pos_x(x+rx);
	this.group.children[i].y = tile_pos_y(y+ry);
	this.group.children[i].tile_x = x + rx;
	this.group.children[i].tile_y = y + ry;
};

//CREATION//
Block.prototype.create_block = function (x, y) {
	//create group and populate with tiles
	this.group = game.add.group();
	this.each_tile_pos();(x, y, this.create_tile.bind(this));
	this.new_pos(x, y);
};
Block.prototype.create_tile = function() {
	//create tile sprite
	var canvasBlock = new Phaser.BitmapData(game, 'block', TILE_WIDTH, TILE_HEIGHT);
	canvasBlock.fill(55, 55, 100);
	var tile = game.add.sprite(0, 0, canvasBlock);
	tile.tile_x = 0;
	tile.tile_y = 0;
	this.group.add(tile);
};

//HELPERS//
//run a function on each tile in the block.
Block.prototype.each_tile_pos = function(x, y, fn) {
	var bit;
	var blocks = this.shape[this.dir];
	var rx = ry = 0;
	var i = 0;
	for (bit = 0x8000; bit > 0; bit = bit >> 1) {
		if (blocks & bit) {
			fn(x, y, rx, ry, i);
			i++;
		}
		if (++rx == 4) {
			rx = 0;
			++ry;
		}
	}
};

Block.prototype.tile_coords = function() {
	var tile_coords_arr = [];
	for (tile in this.group.children) {
		tile_coords_arr.push([
			this.group.children[tile].tile_x, 
		this.group.children[tile].tile_y
		]);
	}
	return tile_coords_arr;
};