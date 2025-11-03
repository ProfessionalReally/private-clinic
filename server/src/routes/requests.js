const { Router } = require('express');
const Request = require('../models/Requests');

const requestRouter = Router();

requestRouter.post('/', async (req, res) => {
	const { fullName, phone, problemDescription } = req.body;

	const newReq = new Request({
		userId: req.userId,
		fullName,
		phone,
		problemDescription,
	});

	await newReq.save();
	res.status(201);
});

requestRouter.get('/', async (req, res) => {
	try {
		const requests = await Request.find();
		res.json(requests);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
});

module.exports = requestRouter;
