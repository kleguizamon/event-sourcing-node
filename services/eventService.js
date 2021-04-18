const Events = require('../models/eventModel');

class EventServices {
	getEvent(clientId) {
		let query;
		if (clientId) {
			query = Events.find({ clientId: clientId }).exec();
		} else {
			query = Events.find().exec();
		}
		return query;
	}
	postEvent(event) {
		const newEvent = new Events(event);
		return newEvent.save();
	}

	async getCartProjection(id) {
		const events = await Events.find({ clientId: id }).exec();
		const projection = project(events);
		return projection;
	}
}

function project(events) {
	const projection = events.reduce(applyEventToCart, { items: {} });
	return projection;
}

function applyEventToCart(cart, event) {
	event.type === 'add' ? addEvent(cart, event) : removeEvent(cart, event);
	return cart;
}

function addEvent(cart, event) {
	if (cart.items[event.item]) {
		cart.items[event.item].qty++;
	} else {
		cart.items[event.item] = {
			qty: 1,
		};
	}
}

function removeEvent(cart, event) {
	if (cart.items?.[event.item].qty == 1) {
		delete cart.items[event.item];
	} else if (cart.items[event.item].qty > 1) {
		cart.items[event.item].qty--;
	}
}
module.exports = EventServices;
