var React = require('react');
var History = require('react-router').History;

var Commute = React.createClass({
	mixins: [History],

	getInitialState: function () {
		var cookie = document.cookie.replace(/ /g,'').split(";")
		return { home: cookie[0].slice(5), 
						 work: cookie[1].slice(5), 
						 startPoint: "",
						 endpoint: "",
						 headingTo: "",
						 apiKey: "&key=ZV4R-PUQ9-86WT-DWE9",
						 optionSelected: false,
						 trips: []
						}
	},

	componentDidMount: function () {
		$('.commute.show').hide();
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

	goToRoot: function () {
		this.props.history.pushState(null, "/");
	},

	render: function () {
		if (this.state.optionSelected === false) {
			return (
				<div className="commute page">
					<div className="commute options">
						<h1 className="commute options header">Where are you headed to?</h1>
						<div className="commute option buttons">
							<button onClick={this.goWork} type="button" className="btn btn-secondary btn-lg btn-block">Work</button>
							<button onClick={this.goHome} type="button" className="btn btn-primary btn-lg btn-block">Home</button>
							<button onClick={this.goToRoot} type="button" className="btn btn-danger">Change Commute</button>
						</div>
					</div>
				</div>
					)
			} else {
				return (
					<div className="commute show">
						<h1 className="commute header">{this.state.headingTo}</h1>            
						<h2 className="commute subheader">{this.state.startPoint} to {this.state.endPoint}</h2>
						  <table className="table table-bordered">
						    <thead>
						      <tr>
						        <th>Departing</th>
						        <th>Arriving</th>
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
					</div>
				)
			}
		}
});

module.exports = Commute;