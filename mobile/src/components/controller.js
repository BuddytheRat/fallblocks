Controller = (function() {

	var exports = {};

	//PUBLIC//

	exports.keyboard = {};

	exports.init = function() {
		var timeout_clock = game.time.events.loop(1, update_timeouts);
		exports.add_keys(KEYS);
	};

	exports.key_down = function(action, timeout = 0) {
		for (key in exports.keyboard[action]) {
			if (exports.keyboard[action][key].isDown && timeouts[action] == 0) {
				timeouts[action] = timeout;
				return true;
			}
		}
		return false;
	};

	exports.set_timeout = function(action, timeout) {
		timeouts[action] += timeout;
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
				timeouts[action] = 0;
			}
		}
	};

	//PRIVATE//

	var timeouts = {};

	var update_timeouts = function () {
		for (action in timeouts) {
			if (timeouts[action] > 0) {
				timeouts[action]--;
			} else {
				timeouts[action] == 0;
			}
		}
	}

	return exports;

}());