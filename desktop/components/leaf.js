var Leaf = function(x, y, lifetime) {
	this.sprite = game.add.sprite(x, y, 'leaf');
	this.sprite.scale.setTo(GAME_SCALE, GAME_SCALE);
	this.sprite.frame = Math.floor(Math.random() * 25);
	this.lifetime = lifetime;
};