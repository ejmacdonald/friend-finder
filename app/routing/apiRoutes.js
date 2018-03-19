// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
// API GET Requests
  app.get("/app/data/friends", function(req, res) {
    res.json(friendsData);
  });


//API POST Routes

app.post("/app/data/friends", function(req, res) {
// find the closest friend to this set of answers
	var diff = 0;
	var diffOld = 100;
	var matchKey = 0;

	for (i=0; i<friendsData.length; i++) {
		for (j=0; j<3; j++) {
			diff = diff + Math.abs(friendsData[i].Answers[j] - req.body.Answers[j]);
			}

//record i as matchKey, this keeps track of the array position of the closest match 
			if (diff < diffOld) {
				diffOld = diff;
				matchKey = i;
			}
			diff = 0;
	}

      friendsData.push(req.body);

//return the json object for the closest match
      res.json(friendsData[matchKey]);
  });
};

