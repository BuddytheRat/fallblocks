var bootState = {
	 preload: function() {
	 	//set game scaling
		game.stage.smoothed = false;
		//load images and sounds
		game.load.image('dioramabg', 'img/craptree.png');
		game.load.image('treeshader', 'img/tree_shader.png');
		game.load.spritesheet('leaf', 'img/leaves.png', 6, 5);
	 },

	 create: function() {
	 	Diorama.init();
	 }
};