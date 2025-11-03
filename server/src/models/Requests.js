const mongoose = require('mongoose');

const requestSchema = mongoose.Schema(
	{
		fullName: { type: String, required: true },
		phone: { type: String, required: true },
		problemDescription: { type: String, required: true },
		date: {
			type: String,
			required: true,
			default: new Date().toISOString(),
		},
	},
	{
		toJSON: {
			virtuals: true,
			versionKey: false,
			transform: (doc, ret) => {
				delete ret._id;
			},
		},
		toObject: { virtuals: true },
	},
);

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
