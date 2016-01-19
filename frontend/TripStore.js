var Store = require('flux/utils').Store;
var AppDispatcher = require('./Dispatcher');
var BartConstants = require('./BartConstants');
var TripStore = new Store(AppDispatcher);

var tripInformation;
var stations = [];

updateTripInformation = function (trip) {
	tripInformation = trip;
};

updateStationNames = function (stationNames) {
	stations = stationNames;
	$('#route-times').fadeOut(100);
	$('#route-times').fadeIn(500);
};

TripStore.all = function () {
	return tripInformation;
};

TripStore.getStationNames = function () {
	return stations;
};

TripStore.__onDispatch = function (payload) {
	switch(payload.actionType) {
		case BartConstants.TRIP_INFO_RECEIVED:
			updateTripInformation(payload.tripInformation);
			break;
		case BartConstants.STATION_NAMES_RECEIVED:
			updateStationNames(payload.stationNames);
			break;
	}
	TripStore.__emitChange();
};

module.exports = TripStore;