class EventController {
	constructor(eventServices) {
		this.eventServices = eventServices;
	}
	async getEvent(req, res) {
		try {
			const { clientId } = req.query;
			const event = await this.eventServices.getEvent(clientId);
			res.status(200).json(event);
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async getCartById(req, res) {
		try {
			const id = req.params.id;
			const event = await this.eventServices.getCartProjection(id);
			res.status(200).json(event);
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async postEvent(req, res) {
		const { body } = req;
		const { clientId, type, item } = body;

		const event = {
			clientId: clientId,
			type: type,
			item: item,
		};
		try {
			await this.eventServices.postEvent(event);
			res.status(200).json('Added Event!');
		} catch (error) {
			res.status(500).json('Internal Error');
		}
	}
}

module.exports = EventController;
