const BusinessCard = require("../models/businessCardModel");
const cloudinary = require("cloudinary");

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addBusinessCard = async (req, res, next) => {
	const { firstName, surname, companyName, phoneNumber, email, website, businessCardId } = req.body;

	const businessCard = await BusinessCard.create({
		firstName,
		surname,
		companyName,
		phoneNumber,
		email,
		website,
		user: req.user._id,
		businessCardId,
	}).catch((err) => {
		console.log(err);
		return res.status(500).json({
			status: "Error",
			data: err.message,
		});
	});

	res.status(200).json({
		status: "success",
		data: businessCard,
	});
};
