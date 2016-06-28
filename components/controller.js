var Controller = (function() {

	var exports = {};

	//PUBLIC//

	exports.keyboard = {};

	exports.key_down = function(action) {
		for (key in exports.keyboard[action]) {
			if (exports.keyboard[action][key].isDown) {
				console.log('pressed'); 
				return true;
			}
		}
		return false;
	};

	exports.add_keys = function(obj) {
		//Accepts keys in form of an object literal
		//i.e. { action_name: [KEY_NAME1, KEY_NAME2] }
		for (var action in obj) {
			exports.keyboard[action] = [];
			for (key in obj[action]) {
				exports.keyboard[action].push(
					game.input.keyboard.addKey(Phaser.KeyCode[obj[action][key]])
				);
			}
		}
	};

	//PRIVATE//

	return exports;

}());