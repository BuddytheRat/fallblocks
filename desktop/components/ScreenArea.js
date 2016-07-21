var ScreenArea  = {
	init: function (game, x, y, width, height, scale = 1) {
		this.game = game;
		this.x = x;
		this.y = y;
		this.scale = scale;
		this.pixel_width = width;
		this.pixel_height = height;
		this.width = width * scale;
		this.height = height * scale;

		this.group = game.add.group();
	},

	add_sprite: function(x, y, key, scaling = true) {
		var new_sprite = this.game.add.sprite(
			this.x + (x * this.scale),
			this.y + (y * this.scale),
			key
		);
		if (scaling) { new_sprite.scale.setTo(this.scale, this.scale); }
		this.group.add(new_sprite);
		return new_sprite;
	},

	set_sprite_pos: function(x, y, sprite) {
		sprite.x = x * this.scale;
		sprite.y = y * this.scale;
	},
	
	move_sprite: function(x, y, sprite) {
		sprite.x += x * this.scale;
		sprite.y += y * this.scale;
	},
}