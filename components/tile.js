var Tile = function(x, y, color) {
	this.color = color;
	this.x = x;
	this.y = y;
	this.canvas = new Phaser.BitmapData(game, 'tile', TILE_WIDTH, TILE_HEIGHT);
	this.sprite = game.add.sprite(
		this.tile_pos_x(this.x),
		this.tile_pos_y(this.y), 
		this.canvas
	);
	
	this.canvas.fill(color);
};

Tile.prototype.tile_pos_x = function(x) {
	return x * TILE_WIDTH + BOARD_OFFSET_X;
};

Tile.prototype.tile_pos_y = function(y) {
	return y * TILE_HEIGHT + BOARD_OFFSET_Y;
};

//Move relative to current position.
Tile.prototype.move = function(x, y) {
	this.x += x;
	this.y += y;
	this.sprite.x = this.tile_pos_x(this.x);
	this.sprite.y = this.tile_pos_x(this.y);
};

Tile.prototype.set_pos = function(x, y, rx, ry) {
	this.x = x;
	this.y = y;
	this.sprite.x = this.tile_pos_x(this.x);
	this.sprite.y = this.tile_pos_x(this.y);
}

Tile.prototype.kill = function() {
	this.sprite.destroy();
};
