
BasicGame.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {

	create: function() {
        //setup game, display starting sprites, etc.
        this.game.stage.backgroundColor = "#667";
        
        this.Board = Board(this.game);
        this.Board.init();
        this.BlockManager = BlockManager(this.game);
        this.BlockManager.init();

        this.block = this.BlockManager.new_block(3, -3);

        this.place_block = function() {
            this.Board.place_block(this.block.tile_coords());
            //Clear lines if filled.
            var lines = this.Board.check_lines();
            if (lines.length > 0) {
                lines.forEach(function clear_line(line) {
                    this.Board.clear_line(line);
                    this.BlockManager.remove_tiles(line);
                    this.BlockManager.drop_lines(line);
                });
            }
            this.block = this.BlockManager.new_block(3, -3);
            Controller.set_timeout('drop', 5);
        };

        var gamestep = function () {
            //Move Down
            if (this.Board.unoccupied(this.block.tile_coords(), [0, 1])) {
                this.block.move(0, 1);
            //Place Block
            } else {
                this.place_block();
            }
        };
        var timer = game.time.events.loop(Phaser.Timer.SECOND, gamestep, this);

    },

	update: function () {

		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

	},

	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	}

};
