const db = require("../models");
const Category = db.categories;
const Op = db.Sequelize.Op;

// Create and Save a new Category
exports.create = (req, res) => {
	// Validate request
	if (!req.body.name) {
		console.log("req.body = ", req.body);
	res.status(400).send({
		message: "Content can not be empty!"
	});
	return;
	}

	// Create a Category
	const category = {
	name: req.body.name,
	description: req.body.description,
	lft: req.body.lft,
	rgt: req.body.rgt
	};

	// Save Category in the database
	Category.create(category)
	.then(data => {
		res.send(data);
	})
	.catch(err => {
		res.status(500).send({
		message:
			err.message || "Some error occurred while creating the Category."
		});
	});
};

// Retrieve all Categories from the database.
exports.findAll = (req, res) => {
	console.log("category.controller :: findAll >> req = ", req);
	const name = req.query.name;
	var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

	Category.findAll({ where: condition })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving categories."
			});
		});
};

exports.findAll2 = (req, res) => {
	Category.findAll({ group: 'name' })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving categories."
			});
		});
}

exports.findOne = (req, res) => {
	//TODO
	/*const id = req.params.id;

	Category.findByPk(id)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving Category with id=" + id
			});
		});*/
};

// Update a Category by the id in the request
exports.update = (req, res) => {

};

// Delete a Category with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Categories from the database.
exports.deleteAll = (req, res) => {

};