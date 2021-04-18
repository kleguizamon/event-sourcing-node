class Projection {
	async project(events) {
		const projection = events.reduce(applyEventToCart, { items: {} });
		return projection;
	}

	async applyEventToCart(cart, event) {
		event.type === 'add' ? addEvent(cart, event) : removeEvent(cart, event);
		return cart;
	}

	async addEvent(cart, event) {
		if (cart.items[event.item]) {
			cart.items[event.item].qty++;
		} else {
			cart.items[event.item] = {
				qty: 1,
			};
		}
	}

	async removeEvent(cart, event) {
		if (cart.items?.[event.item].qty == 1) {
			delete cart.items[event.item];
		} else if (cart.items[event.item].qty > 1) {
			cart.items[event.item].qty--;
		}
	}
}

module.exports = Projection;
