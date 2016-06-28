var Controller = (function() {

	var exports = {};

	//PUBLIC//

	exports.keyboard = {};

	exports.init = function() {
		var downAndChecked_reset = game.time.events.loop(1, reset_pressed);
	};

	exports.key_down = function(action) {
		for (key in exports.keyboard[action]) {
			if (exports.keyboard[action][key].isDown) {
				return true;
			}
		}
		return false;
	};

	exports.key_down_once = function(action) {
		/* Return true if key is down, 
		and then return false untill key 
		is released and pressed again. */

		/* NOTE: Should impliment this 
		into key_down as an optional 
		timeout argument instead. */ 
		if (downAndChecked.indexOf(action) >= 0) {
			return false;
		} else if (exports.key_down(action)) {
			downAndChecked.push(action);
			return true;
		}
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

	var downAndChecked = [];

	var reset_pressed = function () {
		for (action in downAndChecked) {
			if (!exports.key_down(downAndChecked[action])) {
				downAndChecked.splice(action, 1);
			}
		}
	}

	return exports;

}());