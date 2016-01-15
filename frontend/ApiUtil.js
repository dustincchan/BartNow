var BartActions = require('./BartActions');

module.exports = {	
	getTripInfo: function (start, end) {
		var apiKey = "&key=ZV4R-PUQ9-86WT-DWE9";
	  var xhttp = new XMLHttpRequest();
	  var linkStart = "http://api.bart.gov/api/sched.aspx?cmd=depart&orig="
	  var link = linkStart + start + 
	  						"&dest=" + end + 
	  						apiKey;
	  xhttp.onreadystatechange = function() {
	    if (xhttp.readyState == 4 && xhttp.status == 200) {
	    	var response = xhttp.responseXML;
	    	this.parseResponse(response);
	    }
	  }.bind(this);
	  xhttp.open("GET", link, true);
	  xhttp.send();
  },

  parseResponse: function (response) {
  	var tripObjectArray = [];
		var tripObject = {};
		var trips = response.getElementsByTagName("trip");
		for (var i = 0; i < trips.length; i++) {
			tripObject = {
				departure: $(trips[i]).attr('origTimeMin'),
				arrival: $(trips[i]).attr('destTimeMin'),
			}
			tripObjectArray.push(tripObject); 
		}
		BartActions.receiveTripInformation(tripObjectArray);
  }
}