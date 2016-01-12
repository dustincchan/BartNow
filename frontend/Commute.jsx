var React = require('react');
var History = require('react-router').History;

var stationMap = {
	"12TH" : "12th St. Oakland City Center",
	"16TH" : "16th St. Mission",
	"19TH" : "19th St. Oakland",
	"24TH" : "24th St. Mission",
	"ASHB" : "Ashby",
	"BALB" : "Balboa Park",
	"BAYF" : "Bay Fair",
	"CAST" : "Castro Valley",
	"CIVC" : "Civic Center/UN Plaza",
	"COLS" : "Coliseum",
	"COLM" : "Colma",
	"CONC" : "Concord",
	"DALY" : "Daly City",
	"DBRK" : "Downtown Berkeley",
	"DUBL" : "Dublin/Pleasanton",
	"DELN" : "El Cerrito del Norte",
	"PLZA" : "El Cerrito Plaza",
	"EMBR" : "Embarcadero",
	"FRMT" : "Fremont",
	"FTVL" : "Fruitvale",
	"GLEN" : "Glen Park",
	"HAYW" : "Hayward",
	"LAFY" : "Lafayette",
	"LAKE" : "Lake Merritt",
	"MCAR" : "MacArthur",
	"MLBR" : "Millbrae",
	"MONT" : "Montgomery St.",
	"NBRK" : "North Berkeley",
	"NCON" : "North Concord/Martinez",
	"OAKL" : "Oakland Intl Airport",
	"ORIN" : "Orinda",
	"PITT" : "Pittsburg/Bay Point",
	"PHIL" : "Pleasant Hill/Contra Costa Centre",
	"POWL" : "Powell St.",
	"RICH" : "Richmond",
	"ROCK" : "Rockridge",
	"SBRN" : "San Bruno",
	"SFIA" : "San Francisco Intl Airport",
	"SANL" : "San Leandro",
	"SHAY" : "South Hayward",
	"SSAN" : "South San Francisco",
	"UCTY" : "Union City",
	"WCRK" : "Walnut Creek",
	"WDUB" : "West Dublin/Pleasanton",
	"WOAK" : "West Oakland"
};

var Commute = React.createClass({
	mixins: [History],

	getInitialState: function () {
		var cookies = document.cookie.replace(/ /g,'').split(";")
		for (var i = 0; i < cookies.length; i++) {
			if (cookies[i].slice(0,4) === "home") {
				var homeStation = cookies[i].slice(5);
			} else if (cookies[i].slice(0,4) === "work") {
				var workStation = cookies[i].slice(5);
			}
		}

		return { home: homeStation, 
						 work: workStation, 
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

	resetCookies: function () {
		document.cookie = "home" + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
		document.cookie = "work" + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
		this.props.history.pushState(null, "/");
	},

	goBack: function () {
		this.setState({ optionSelected: false });
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
							<button onClick={this.resetCookies} type="button" className="btn btn-danger">Change Commute</button>
						</div>
					</div>
				</div>
					)
			} else {
				return (
					<div className="commute show">
						<h1 className="commute header">{this.state.headingTo}</h1>            
						<h2 className="commute subheader">{stationMap[this.state.startPoint]} to {stationMap[this.state.endPoint]}</h2>
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
						    			<tr className="info" key={trip.departure}>
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
		}
});

module.exports = Commute;