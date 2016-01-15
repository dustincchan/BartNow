var Store = require('flux/utils').Store;
var AppDispatcher = require('./Dispatcher');
var BartConstants = require('./BartConstants');
var TripStore = new Store(AppDispatcher);

var tripInformation;

updateTripInformation = function (trip) {
	tripInformation = trip;
};

TripStore.all = function () {
	return tripInformation;
};

TripStore.__onDispatch = function (payload) {
	switch(payload.actionType) {
		case BartConstants.TRIP_INFO_RECEIVED:
			updateTripInformation(payload.tripInformation);
			break;
	}
	TripStore.__emitChange();
};

module.exports = TripStore;