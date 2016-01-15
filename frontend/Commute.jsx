var React = require('react');
var History = require('react-router').History;

var Commute = React.createClass({
	mixins: [History],

	getInitialState: function () {

		return { home: "", 
						 work: "", 
						 startPoint: "",
						 endpoint: "",
						 headingTo: "",
						 apiKey: "&key=ZV4R-PUQ9-86WT-DWE9",
						 optionSelected: false,
						 trips: []
						}
	},

	componentDidMount: function () {
		this.setState({ home: this.props.home, work: this.props.work });
	},

	goWork: function () {
		this.setState({ startPoint: this.state.home, endPoint: this.state.work})
		this.setState({ headingTo: "Going to work!" })
		this.setState({ optionSelected: true })
	  var xhttp = new XMLHttpRequest();
	  var linkStart = "http://api.bart.gov/api/sched.aspx?cmd=depart&orig="
	  var link = linkStart + this.state.home + 
	  						"&dest=" + this.state.work + 
	  						this.state.apiKey;
	  xhttp.onreadystatechange = function() {
	    if (xhttp.readyState == 4 && xhttp.status == 200) {
	    	var response = xhttp.responseXML;
	    	this.parseResponse(response);
	    }
	  }.bind(this);
	  xhttp.open("GET", link, true);
	  xhttp.send();
  },

	goHome: function () {
		this.setState({ startPoint: this.state.work, endPoint: this.state.home})
		this.setState({ headingTo: "Going home!" })
		this.setState({ optionSelected: true })
	  var xhttp = new XMLHttpRequest();
	  var linkStart = "http://api.bart.gov/api/sched.aspx?cmd=depart&orig="
	  var link = linkStart + this.state.work + 
	  						"&dest=" + this.state.home + 
	  						this.state.apiKey;
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
		this.setState({ trips: tripObjectArray })
	},

	resetCookies: function () {
		document.cookie = "home" + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
		document.cookie = "work" + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
		this.props.history.pushState(null, "/");
	},

	goBack: function () {
		this.setState({ optionSelected: false });
	},

	render: function () {
				return (
					<div className="commute show">
						<h1 className="commute header">{this.state.headingTo}</h1>            
						<h2 className="commute subheader">{this.state.home} to {this.state.work}</h2>
						  <table className="table table-bordered">
						    <thead>
						      <tr>
						        <th id="departing">Departing</th>
						        <th id="arriving">Arriving</th>
						      </tr>
						    </thead>
						    <tbody>
						    	{this.state.trips.map(function (trip) {
						    		return (
						    			<tr key={trip.departure}>
							    			<td>{trip.departure}</td>
							    			<td>{trip.arrival}</td>
							    		</tr>
						    		)
						    	})}
						    </tbody>
						  </table>
						  <button id="back-button" onClick={this.goBack} type="button" className="btn btn-danger">Back</button>
					</div>
				)
		}
});

module.exports = Commute;