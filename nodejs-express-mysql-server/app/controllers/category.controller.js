const db = require("../models");
const Category = db.categories;
const Op = db.Sequelize.Op;
const Sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');

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

	db.sequelize.query("SELECT node.id, node.name, node.lft, node.rgt, (COUNT(parent.name) - 1) AS depth FROM categories AS node, categories AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt GROUP BY node.name ORDER BY node.lft;", {type: QueryTypes.SELECT })
			.then( categories => {
				res.send(categories);
			})
			.catch(err => {
				res.status(500).send({
					message:
						err.message || "Some error occurred while retrieving categories."
					})
			});

	/*res.send(categories);
	return;*/

	// const name = req.query.name;
	// var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

	// Category.findAll(
	// 		{ include: [{
	// 				model: Category,
	// 				as: 'Parent'
	// 			}] },
	// 		{ attributes: [ 'id', 'name']}, ///*, [Sequelize.fn('COUNT', Sequelize.col('id')), 'depth']*/
	// 		{ where: condition }
	// 	)
	// 	.then(data => {
	// 		res.send(data);
	// 	})
	// 	.catch(err => {
	// 		res.status(500).send({
	// 			message:
	// 				err.message || "Some error occurred while retrieving categories."
	// 		});
	// 	});
};

//original
/*exports.findAll = (req, res) => {
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
};*/

exports.findOne = (req, res) => {
	const id = req.params.id;

	Category.findByPk(id)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving Category with id=" + id
			});
		});
};

// Update a Category by the id in the request
exports.update = (req, res) => {

};

// Delete a Category with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Categories from the database.
exports.deleteAll = (req, res) => {
	Category.destroy({
			where: {},
			truncate: false
		})
		.then(nums => {
			res.send({ message: `${nums} Categories were deleted successfully!` });
		})
		.catch(err => {
			res.status(500).send({
			message:
				err.message || "Some error occurred while removing all categories."
		 });
	});
};

// Create example Categories table
exports.createExample = (req, res) => {

	//first drop it, then create new
	Category.destroy({
			where: {},
			truncate: false
		})
		.then(nums => {
			db.sequelize.query("INSERT INTO categories (id,name,lft,rgt) VALUES (1,'ELECTRONICS',1,20),(2,'TELEVISIONS',2,9),(3,'TUBE',3,4),(4,'LCD',5,6),(5,'PLASMA',7,8),(6,'PORTABLE ELECTRONICS',10,19),(7,'MP3 PLAYERS',11,14),(8,'FLASH',12,13),(9,'CD PLAYERS',15,16),(10,'2 WAY RADIOS',17,18);", {type: QueryTypes.INSERT })
			.then( (nums) => {
				res.send({ message: `${nums[0]} Categories successfully inserted!`});
			});
		})
		.catch(err => {
			res.status(500).send({
			message:
				err.message || "Some error occurred while creating example categories."
		 });
	});
}