const mongoose = require("mongoose");

const BusinessCardSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, "First name is required!"],
		},
		surname: {
			type: String,
			required: [true, "Surname is required"],
		},
		email: {
			type: String,
			required: [true, "email is required"],
		},
		phoneNumber: {
			type: String,
			required: [true, "Phone Number is required"],
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: [true, "Business Card must belong to a User"],
		},
		businessCardId: {
			type: String,
			unique: true,
			required: [true, "Business Card Id is required"],
		},
		companyName: String,
		website: { type: String },
		imageUrl: {
			type: String,
			unique: true,
		},
	},
	{ timestamps: true }
);

const BusinessCard = mongoose.model("BusinessCard", BusinessCardSchema);

module.exports = BusinessCard;
