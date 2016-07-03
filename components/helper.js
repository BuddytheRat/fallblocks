var hex_to_rgb = function (hex) {
	var rgb_arr = [];
	for (var i = 0; i < 6; i += 2) {
		rgb_arr.push(parseInt(hex.slice(i, i+2), 16));
	}
	return rgb_arr;
}