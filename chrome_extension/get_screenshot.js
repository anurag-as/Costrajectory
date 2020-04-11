#standalone screenshot - working

const webshot = require('webshot');
var url = "https://www.google.com/"
webshot(url, './screenshots/recent.jpg', function(err) {
	if (!err) {
		console.log('Screenshot taken!')
	}
});