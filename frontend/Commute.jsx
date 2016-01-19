var React = require('react');
var TripStore = require('./TripStore');
var History = require('react-router').History;

var Commute = React.createClass({
	mixins: [History],

	getInitialState: function () {
		var advisory = this.getAdvisoryInfo();

		return { 
						 apiKey: "&key=ZV4R-PUQ9-86WT-DWE9",
						 trips: [],
						 startStation: "",
						 endStation: "",
						 advisory: ""
						}
	},

	getAdvisoryInfo: function () {
		var apiKey = "&key=ZV4R-PUQ9-86WT-DWE9";
	  var xhttp = new XMLHttpRequest();
	  var link = "http://api.bart.gov/api/bsa.aspx?cmd=bsa" + apiKey;
	  xhttp.onreadystatechange = function() {
	    if (xhttp.readyState == 4 && xhttp.status == 200) {
	    	var response = xhttp.responseXML;
	    	this.parseAdvisory(response);
	    }
	  }.bind(this);
	  xhttp.open("GET", link, true);
	  xhttp.send();
	},

	parseAdvisory: function (response) {
		var description = response.getElementsByTagName("description")[0].firstChild.data;
		this.setState({ advisory: description });
	},

	componentDidMount: function () {
		this.tripListener = TripStore.addListener(this._tripInformationUpdated);
	},

	componentWillUnmount: function () {
		this.tripListener.remove();
	},

	_tripInformationUpdated: function () {
		var stations = TripStore.getStationNames();
		setTimeout(function () {this.setState({ trips: TripStore.all(), startStation: stations[0], endStation: stations[1] })}.bind(this), 200);
	},

	resetCookies: function () {
		document.cookie = "start" + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
		document.cookie = "stop" + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
		this.props.history.pushState(null, "/");
	},

	render: function () {
			if (typeof this.state.trips === "undefined") {
				return (
					<div className="commute show">
						<h2 className="commute subheader">{this.props.startFull} to {this.props.stopFull}</h2>
						  <table className="table table-bordered">
						    <thead>
						      <tr>
						        <th id="departing">Departing</th>
						        <th id="arriving">Arriving</th>
						      </tr>
						    </thead>

						  </table>
					</div>
				);

			} else {
				return (
					<div className="commute show">
						<h2 className="commute subheader">{this.props.startFull} to {this.props.stopFull}</h2>
						  <table className="table table-bordered">
						    <thead>
						      <tr>
						        <th id="departing">Departing</th>
						        <th id="arriving">Arriving</th>
						      </tr>
						    </thead>
						    <tbody id="route-times">
						    	{this.state.trips.map(function (trip) {
						    		return (
						    			<tr key={trip.departure}>
							    			<td>{trip.departure}</td>
							    			<td>{trip.arrival}</td>
							    		</tr>
						    		)
						    	})
						    	}
						    	<tr key="advisory" id="advisory">
						    		<td><img id="advisory-icon" src="train_inv.gif"/> Advisory</td>
						    		<td>{this.state.advisory}</td>
						    	</tr>
						    </tbody>
						  </table>
					</div>
				);
			}
		}
});

module.exports = Commute;