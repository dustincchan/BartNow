var React = require('react');
var Commute = require('./Commute');
var ApiUtil = require('./ApiUtil');
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

var Welcome = React.createClass({
	mixins: [History],

	getInitialState: function () {
		var start = "Departure Station ";
		var stop = "Arrival Station ";
		if (document.cookie != "") {
			var cookies = document.cookie.replace(/ /g,'').split(";")
			for (var i = 0; i < cookies.length; i++) {
				if (cookies[i].slice(0,5) === "start") {
					var start = cookies[i].slice(6);
					var initStation = stationMap[cookies[i].slice(6)]; 
				} else if (cookies[i].slice(0,4) === "stop") {
					var stop = cookies[i].slice(5);
					var initStop = stationMap[cookies[i].slice(5)];
				}
			}
		}

		return {start: start, 
						initStation: initStation, 
						stop: stop, 
						initStop: initStop,
						greeting: "(Please enable cookies to use this site)"
					}
	},

	componentDidMount: function () {
		if (document.cookie != "") {
			var cookies = document.cookie.replace(/ /g,'').split(";")
			for (var i = 0; i < cookies.length; i++) {
				if (cookies[i].slice(0,4) === "start") {
					this.setState( { start: cookies[i].slice(5) });
				} else if (cookies[i].slice(0,4) === "stop") {
					this.setState( { stop: cookies[i].slice(5) });
				}
			}
		}
	},

	setCookie: function (start, stop) {
		document.cookie="start=" + start + "; expires=Thu, 18 Dec 3017 12:00:00 UTC";
		document.cookie="stop=" + stop + "; expires=Thu, 18 Dec 3017 12:00:00 UTC";
	},

	handleSubmit: function () {
		this.setState({ greeting: "" })
		if (this.state.start === "Departure Station " || this.state.stop === "Arrival Station ") {
			this.setState({ greeting: "(You are missing an entry)" })
			$('#cookies-warning').css('color', 'red');
		} else if (this.state.start === this.state.stop) {
			this.setState({ greeting: "(start and stop stations must not be the same)"})
			$('#cookies-warning').css('color', 'red');
		} else {
			this.setCookie(this.state.start, this.state.stop);
			ApiUtil.getTripInfo(this.state.start, this.state.stop);
		}
	},

	setStartStation: function (event) {
		this.setState({ start: event.target.getAttribute('value') })
		this.setState({ initStation: event.target.text + " " })
	},

	setStopStation: function (event) {
		this.setState({ stop: event.target.getAttribute('value') })
		this.setState({ initStop: event.target.text + " " })
	},

	render: function () {
		return (
		<div className="all components">
			<img src="http://www.ilikewallpaper.net/iphone-4s-wallpapers/download/9787/Downtown-Bay-Bridge-Sa-iphone-4s-wallpaper-ilikewallpaper_com.jpg" id="background-image"/>
			<div className="welcome page">
				<h1 className="welcome header">QuickPlanner</h1>
				  <h3 className="panel-title">Leaving from:</h3>
				  	<div className="panel-body">
							<div className="dropdown">
								<div className="dropdown container">
								  <button id="start-dropdown-button" className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">{this.state.initStation}
								  </button>
								  <ul className="dropdown-menu scrollable-menu">
								    <li onClick={this.setStartStation}><a value="12TH">12th St. Oakland City Center</a></li>
								    <li onClick={this.setStartStation}><a value="16TH">16th St. Mission</a></li>
								    <li onClick={this.setStartStation}><a value="19TH">19th St. Oakland</a></li>
								    <li onClick={this.setStartStation}><a value="24TH">24th St. Mission</a></li>
								    <li onClick={this.setStartStation}><a value="ASHB">Ashby</a></li>
								    <li onClick={this.setStartStation}><a value="BALB">Balboa Park</a></li>
								    <li onClick={this.setStartStation}><a value="BAYF">Bay Fair</a></li>
								    <li onClick={this.setStartStation}><a value="CAST">Castro Valley</a></li>
								    <li onClick={this.setStartStation}><a value="CIVC">Civic Center/UN Plaza</a></li>
								    <li onClick={this.setStartStation}><a value="COLS">Coliseum</a></li>
								    <li onClick={this.setStartStation}><a value="COLM">Colma</a></li>
								    <li onClick={this.setStartStation}><a value="CONC">Concord</a></li>
								    <li onClick={this.setStartStation}><a value="DALY">Daly City</a></li>
								    <li onClick={this.setStartStation}><a value="DBRK">Downtown Berkeley</a></li>
								    <li onClick={this.setStartStation}><a value="DUBL">Dublin/Pleasanton</a></li>
								    <li onClick={this.setStartStation}><a value="DELN">El Cerrito del Norte</a></li>
								    <li onClick={this.setStartStation}><a value="PLZA">El Cerrito Plaza</a></li>
								    <li onClick={this.setStartStation}><a value="EMBR">Embarcadero</a></li>
								    <li onClick={this.setStartStation}><a value="FRMT">Fremont</a></li>
								    <li onClick={this.setStartStation}><a value="FTVL">Fruitvale</a></li>
								    <li onClick={this.setStartStation}><a value="GLEN">Glen Park</a></li>
								    <li onClick={this.setStartStation}><a value="HAYW">Hayward</a></li>
								    <li onClick={this.setStartStation}><a value="LAFY">Lafayette</a></li>
								    <li onClick={this.setStartStation}><a value="LAKE">Lake Merritt</a></li>
								    <li onClick={this.setStartStation}><a value="MCAR">MacArthur</a></li>
								   	<li onClick={this.setStartStation}><a value="MLBR">Millbrae</a></li>
								    <li onClick={this.setStartStation}><a value="MONT">Montgomery St.</a></li>
								    <li onClick={this.setStartStation}><a value="NBRK">North Berkeley</a></li>
								    <li onClick={this.setStartStation}><a value="NCON">North Concord/Martinez</a></li>
								    <li onClick={this.setStartStation}><a value="OAKL">Oakland Intl Airport</a></li>
								    <li onClick={this.setStartStation}><a value="ORIN">Orinda</a></li>
								   	<li onClick={this.setStartStation}><a value="PITT">Pittsburg/Bay Point</a></li>
								    <li onClick={this.setStartStation}><a value="PHIL">Pleasant Hill/Contra Costa Centre</a></li>
								    <li onClick={this.setStartStation}><a value="POWL">Powell St.</a></li>
								    <li onClick={this.setStartStation}><a value="RICH">Richmond</a></li>
								    <li onClick={this.setStartStation}><a value="ROCK">Rockridge</a></li>
								    <li onClick={this.setStartStation}><a value="SBRN">San Bruno</a></li>
								   	<li onClick={this.setStartStation}><a value="SFIA">San Francisco Intl Airport</a></li>
								    <li onClick={this.setStartStation}><a value="SANL">San Leandro</a></li>
								    <li onClick={this.setStartStation}><a value="SHAY">South Hayward</a></li>
								    <li onClick={this.setStartStation}><a value="SSAN">South San Francisco</a></li>
								    <li onClick={this.setStartStation}><a value="UCTY">Union City</a></li>
								    <li onClick={this.setStartStation}><a value="WCRK">Walnut Creek</a></li>
								   	<li onClick={this.setStartStation}><a value="WDUB">West Dublin/Pleasanton</a></li>
								    <li onClick={this.setStartStation}><a value="WOAK">West Oakland</a></li>
								  </ul>
								</div>
							</div>
						</div>

				  <div className="panel-heading">
				    <h3 className="panel-title" id="heading-to-label">Heading to:</h3>
				  </div>
				  <div className="panel-body">
						<div className="dropdown">
							<div className="dropdown container">
							  <button id="stop-dropdown-button" className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">{this.state.initStop}
							  </button>
							  <ul className="dropdown-menu scrollable-menu">
							    <li onClick={this.setStopStation}><a value="12TH">12th St. Oakland City Center</a></li>
							    <li onClick={this.setStopStation}><a value="16TH">16th St. Mission</a></li>
							    <li onClick={this.setStopStation}><a value="19TH">19th St. Oakland</a></li>
							    <li onClick={this.setStopStation}><a value="24TH">24th St. Mission</a></li>
							    <li onClick={this.setStopStation}><a value="ASHB">Ashby</a></li>
							    <li onClick={this.setStopStation}><a value="BALB">Balboa Park</a></li>
							    <li onClick={this.setStopStation}><a value="BAYF">Bay Fair</a></li>
							    <li onClick={this.setStopStation}><a value="CAST">Castro Valley</a></li>
							    <li onClick={this.setStopStation}><a value="CIVC">Civic Center/UN Plaza</a></li>
							    <li onClick={this.setStopStation}><a value="COLS">Coliseum</a></li>
							    <li onClick={this.setStopStation}><a value="COLM">Colma</a></li>
							    <li onClick={this.setStopStation}><a value="CONC">Concord</a></li>
							    <li onClick={this.setStopStation}><a value="DALY">Daly City</a></li>
							    <li onClick={this.setStopStation}><a value="DBRK">Downtown Berkeley</a></li>
							    <li onClick={this.setStopStation}><a value="DUBL">Dublin/Pleasanton</a></li>
							    <li onClick={this.setStopStation}><a value="DELN">El Cerrito del Norte</a></li>
							    <li onClick={this.setStopStation}><a value="PLZA">El Cerrito Plaza</a></li>
							    <li onClick={this.setStopStation}><a value="EMBR">Embarcadero</a></li>
							    <li onClick={this.setStopStation}><a value="FRMT">Fremont</a></li>
							    <li onClick={this.setStopStation}><a value="FTVL">Fruitvale</a></li>
							    <li onClick={this.setStopStation}><a value="GLEN">Glen Park</a></li>
							    <li onClick={this.setStopStation}><a value="HAYW">Hayward</a></li>
							    <li onClick={this.setStopStation}><a value="LAFY">Lafayette</a></li>
							    <li onClick={this.setStopStation}><a value="LAKE">Lake Merritt</a></li>
							    <li onClick={this.setStopStation}><a value="MCAR">MacArthur</a></li>
							   	<li onClick={this.setStopStation}><a value="MLBR">Millbrae</a></li>
							    <li onClick={this.setStopStation}><a value="MONT">Montgomery St.</a></li>
							    <li onClick={this.setStopStation}><a value="NBRK">North Berkeley</a></li>
							    <li onClick={this.setStopStation}><a value="NCON">North Concord/Martinez</a></li>
							    <li onClick={this.setStopStation}><a value="OAKL">Oakland Intl Airport</a></li>
							    <li onClick={this.setStopStation}><a value="ORIN">Orinda</a></li>
							   	<li onClick={this.setStopStation}><a value="PITT">Pittsburg/Bay Point</a></li>
							    <li onClick={this.setStopStation}><a value="PHIL">Pleasant Hill/Contra Costa Centre</a></li>
							    <li onClick={this.setStopStation}><a value="POWL">Powell St.</a></li>
							    <li onClick={this.setStopStation}><a value="RICH">Richmond</a></li>
							    <li onClick={this.setStopStation}><a value="ROCK">Rockridge</a></li>
							    <li onClick={this.setStopStation}><a value="SBRN">San Bruno</a></li>
							   	<li onClick={this.setStopStation}><a value="SFIA">San Francisco Intl Airport</a></li>
							    <li onClick={this.setStopStation}><a value="SANL">San Leandro</a></li>
							    <li onClick={this.setStopStation}><a value="SHAY">South Hayward</a></li>
							    <li onClick={this.setStopStation}><a value="SSAN">South San Francisco</a></li>
							    <li onClick={this.setStopStation}><a value="UCTY">Union City</a></li>
							    <li onClick={this.setStopStation}><a value="WCRK">Walnut Creek</a></li>
							   	<li onClick={this.setStopStation}><a value="WDUB">West Dublin/Pleasanton</a></li>
							    <li onClick={this.setStopStation}><a value="WOAK">West Oakland</a></li>
							  </ul>
							</div>
						</div>
				  </div>
				<div className="panel-body">
				<button 
					onClick={this.handleSubmit} 
					data-toggle="collapse"
					data-target="#commute-component"
					type="button" 
					className="btn btn-success">Done
				</button>
				<h6 id="cookies-warning">{this.state.greeting}</h6>
				</div>
				</div>
				<div className="collapse" id="commute-component">
					<div className="panel panel-default">
						<Commute 
							start={this.state.start} stop={this.state.stop}
							startFull={this.state.initStation} stopFull={this.state.initStop}/>
					</div>
				</div>
			<br/>
		</div>
		)
	}
});

module.exports = Welcome;