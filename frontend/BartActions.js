var Dispatcher = require('./Dispatcher');
var BartConstants = require('./BartConstants');

module.exports = {
	receiveTripInformation: function (tripInformation) {
		Dispatcher.dispatch({
			actionType: BartConstants.TRIP_INFO_RECEIVED,
			tripInformation: tripInformation
		})
	},
	receiveStationNames: function (stationNames) {
		Dispatcher.dispatch({
			actionType: BartConstants.STATION_NAMES_RECEIVED,
			stationNames: stationNames
		})
	}
}