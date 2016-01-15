var Dispatcher = require('./Dispatcher');
var BartConstants = require('./BartConstants');

module.exports = {
	receiveTripInformation: function (tripInformation) {
		Dispatcher.dispatch({
			actionType: BartConstants.TRIP_INFO_RECEIVED,
			tripInformation: tripInformation
		})
	}
}