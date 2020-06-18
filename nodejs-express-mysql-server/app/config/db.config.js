module.exports = {
	HOST: "localhost",
	PORT: 3306,
	USER: "myuser",
	PASSWORD: "123456",
	DB: "shopdb",
	dialect: "mysql",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	retry: {
		max: 10
	}
};

/*module.exports = {
	HOST: "db4free.net",
	PORT: 3306,
	USER: "yrakova",
	PASSWORD: "yrakova84",
	DB: "yrakova_db",
	dialect: "mysql",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	retry: {
		max: 10
	}
};*/