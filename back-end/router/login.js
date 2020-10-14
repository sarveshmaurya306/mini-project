const express = require('express');
const router = new express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')


router.post('/login', async (req, res) => {

	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400).send({ error: "Please provide username and password." });
	}

	try {
		const user = await User.findByCredentials(email, password)
		await user.generateAuthToken();
		await user.save();

		// res.redirect('/home')
		// console.log(user)
		res.status(201).send({ message: 'logged in', token: user.token, id: user._id, name:user.name,email:user.email });

	} catch (e) {
		console.log(e);
		res.status(500).send({ error: 'unable to login' })
	}

})


module.exports = router;