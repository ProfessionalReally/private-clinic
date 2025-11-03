const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
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

const User = mongoose.model('User', userSchema);

module.exports = User;
