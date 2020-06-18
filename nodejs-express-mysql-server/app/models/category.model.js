module.exports = (sequelize, Sequelize) => {
	const Category = sequelize.define("category", {
		name: {
			type: Sequelize.STRING
		},
		description: {
			type: Sequelize.STRING
		},
		lft: {
			type: Sequelize.INTEGER
		},
		rgt: {
			type: Sequelize.INTEGER
		},
		createdAt: {
			type: 'DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3)'
		},
		updatedAt: {
			type: 'DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'
		}
	});

	return Category;
};