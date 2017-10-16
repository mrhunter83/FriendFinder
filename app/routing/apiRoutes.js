var friends = require("../data/friends.js");

module.exports = function(app) {

	app.get("/api/friends", function(req, res) {
		res.json(friends);
	});

	app.post("/api/friends", function(req, res) {
		var comparisonArray = [];
		for(i=0; i<friends.length; i++) {
			var absDiff = 0;
			for(j=0; j<10; j++) {
				absDiff += Math.abs(friends[i].scores[j] - req.body.scores[j]);
			}
			comparisonArray.push(absDiff);
		}
		var minDiff = Math.min.apply(null, comparisonArray);
		var friendIndex = comparisonArray.indexOf(minDiff);
		var match = friends[friendIndex];
		friends.push(req.body);
		res.json(match);
	});
};