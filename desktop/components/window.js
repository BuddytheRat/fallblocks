var GameWindow = function(game, x, y, width, height, scale = 1) {
	this.x = x;
	this.y = y;
	this.scale = scale;
	this.width = width * scale;
	this.height = height * scale;

	this.group = game.add.group();
}

GameWindow.prototype.addSprite = function(x, y, key) {
	var new_sprite = game.add.sprite(
		this.x + x * this.scale,
		this.y + y * this.scale,
		key
	);
	new_sprite.scale.setTo(this.scale, this.scale);
	this.group.add(new_sprite);
	return new_sprite;
}

GameWindow.prototype.moveSprite = function(x, y, sprite) {
	sprite.x += x * this.scale;
	sprite.y += y * this.scale;
}