var Block = function(x, y, shape, color) {
	this.shape = shape;
	this.dir = 0;
	this.color = color;
	this.x = x;
	this.y = y;
	this.tiles = [];

	//create tiles
	this.new_rot(this.x, this.y, 
		function create_tile(rx, ry) {
			this.tiles.push(new Tile(this.x+rx, this.y+ry, color));
		}.bind(this)
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
	this.new_rot(this.x, this.y, 
		function place_tile(rx, ry, tile) {
			this.tiles[tile].set_pos(this.x+rx, this.y+ry);
		}.bind(this)
	);
};

Block.prototype.rotate_ccw = function() {
	this.dir -= 1;
	if (this.dir < 0) { this.dir = 3 };
	this.new_rot(this.x, this.y,
		function place_tile(rx, ry, tile) {
			this.tiles[tile].set_pos(this.x+rx, this.y+ry);
		}.bind(this)
	);
};

Block.prototype.move = function(x, y) {
	//moves block relative to current position
	this.x += x;
	this.y += y;
	this.tiles.forEach(function move_tile(tile) {
		tile.move(x, y);
	})
};

Block.prototype.new_rot = function(x, y, fn) {
	var bit;
	var blocks = this.shape[this.dir];
	var rx = ry = 0;
	var tile = 0;
	for (bit = 0x8000; bit > 0; bit = bit >> 1) {
		if (blocks & bit) {
			fn(rx, ry, tile);
			tile++;
		}
		if (++rx == 4) {
			rx = 0;
			++ry;
		}
	}
};

Block.prototype.tile_coords = function() {
	var coords = [];
	this.tiles.forEach(function push_coords(tile) {
		coords.push([tile.x, tile.y]);
	});
	return coords;
};