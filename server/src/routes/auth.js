const { Router } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');

const authRouter = new Router();

const cookieOptions = {
	httpOnly: true,
	secure: process.env.NODE_ENV === 'production',
	sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
	maxAge: 60 * 60 * 1000,
};

authRouter.post('/register', async (req, res) => {
	try {
		const { email, password } = req.body;

		const existing = await User.findOne({ email });
		if (existing) {
			return res.status(400).json({ message: 'User already exists' });
		}

		const hash = await bcrypt.hash(password, 10);
		const user = new User({ email, password: hash });
		await user.save();

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: '1h',
		});

		res.cookie('token', token, cookieOptions);

		res.status(201).json({
			message: 'User created successfully',
			token,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
});

authRouter.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res
				.status(400)
				.json({ message: 'Invalid email or password' });
		}

		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			return res
				.status(400)
				.json({ message: 'Invalid email or password' });
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: '1h',
		});

		res.cookie('token', token, cookieOptions);

		res.status(200).json({
			message: 'User logged in successfully',
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
});

authRouter.get('/me', authMiddleware, async (req, res) => {
	try {
		res.status(200).json(req.user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
});

authRouter.post('/logout', (req, res) => {
	res.clearCookie('token', {
		httpOnly: true,
		sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
		secure: process.env.NODE_ENV === 'production',
	});
	res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = authRouter;
