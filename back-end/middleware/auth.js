const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const utils = require('../utils/utils')

const auth = async function (req, res, next) {
	try {
		const token = req.header('Authorization').replace('Bearer ', '')
		const decoded = jwt.verify(token, utils.jwtKey)
		// const decoded= req.body.id
		// const user = await User.findOne({ _id: decoded})
		const user = await User.findById({ _id: decoded._id, token: token })

		if (!user) {
			throw new Error()
		}

		req.user = user
		next()

	} catch (e) {
		res.status(401).send({ error: 'unathorised' });
	}
}

module.exports = auth;
/*


const jwt = require('jsonwebtoken')
const User = require('../models/user')
const auth = async (req, res, next) => {
try {
const token = req.header('Authorization').replace('Bearer ', '')
const decoded = jwt.verify(token, 'miniproject')
const user = await User.findOne({ _id: decoded._id, token:token })
if (!user) {
throw new Error()
}
req.user = user
next()
} catch (e) {
res.status(401).send({ error: 'Please authenticate.' })
}
}
module.exports = auth*/