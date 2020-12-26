const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const { Pool } = require('pg');
const db = new Pool();

const resolvers = {
	Query: {
		users: async () => {
			try {
				const arrOfUsers = await db.query('SELECT * FROM users');
				return arrOfUsers.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		user: async (obj, { id }) => {
			try {
				const numId = parseInt(id);
				const arrOfusers = await db.query(
					`SELECT * FROM users WHERE id = '${numId}';`
				);
				return arrOfusers.rows[0];
			} catch (e) {
				console.log(e.stack);
			}
		},
		sites: async () => {
			try {
				const sites = await db.query(`SELECT * FROM sites;`);
				return sites.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		site: async (obj, { id }) => {
			try {
				const numId = parseInt(id);
				const foundSite = await db.query(
					`SELECT * FROM sites WHERE site_number = '${numId}';`
				);
				return foundSite.rows[0];
			} catch (e) {
				console.log(e.stack);
			}
		},
		bills: async () => {
			try {
				const bills = await db.query(`SELECT * FROM bills;`);
				return bills.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		bill: async (obj, { id }) => {
			try {
				const foundBill = await db.query(
					`SELECT * FROM bills WHERE id = '${id}'`
				);
				console.log(foundBill.rows);
				return foundBill.rows[0];
			} catch (e) {
				console.log(e.stack);
			}
		},
		payments: async () => {
			try {
				const payments = await db.query(`SELECT * FROM payments;`);
				return payments.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		payment: async (obj, { id }) => {
			try {
				const foundPayment = await db.query(
					`SELECT * FROM payments WHERE id = '${id}'`
				);
				return foundPayment.rows[0];
			} catch (e) {
				console.log(e.stack);
			}
		},
	},

	User: {
		sites: async (obj, arg, context) => {
			try {
				const arrOfSites = await db.query(
					`SELECT * FROM sites WHERE user_id = '${obj.id}'`
				);
				return arrOfSites.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
	},

	Site: {
		users: async (obj, arg, context) => {
			try {
				const arrOfUsers = await db.query(
					`SELECT * FROM users WHERE site_id = '${obj.site_number}'`
				);
				return arrOfUsers.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
	},

	Bill: {
		payments: async (obj, arg, context) => {
			try {
				const arrOfPayments = await db.query(
					`SELECT * FROM payments WHERE bill_id = '${obj.id}'`
				);
				return arrOfPayments.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
	},

	Mutation: {
		createSite: async (obj, { site }, context) => {
			// database queries go here.
			console.log(site);
			console.log(site.tl_address);
			try {
				const newSite = await db.query(`INSERT INTO sites (site_number,
					tl_address,
					tl_city,
					tl_state,
					tl_zip_code,
					tl_road_side,
					tl_phone_number,
					trout_lake_water,
					land_company,
					owners_association) VALUES (${site.site_number},
						'${site.tl_address}',
						'${site.tl_city}',
						'${site.tl_state}',
						${site.tl_zip_code},
						'${site.tl_road_side}',
						'${site.tl_phone_number}',
						${site.trout_lake_water},
						'${site.land_company}',
						'${site.owners_association}') RETURNING *`);
				return newSite.rows;
			} catch (e) {
				console.log(e.stack);
			}
			// const newSiteList = [
			// 	...sites,
			// 	site,
			// 	// new movie data goes here
			// ];
			// // Return data as expected in schema
			// return newSiteList;
		},
	},

	Date: new GraphQLScalarType({
		name: 'Date',
		description: `it's a date`,
		parseValue(value) {
			// value from the client
			return new Date(value);
		},
		serialize(value) {
			// value sent to the client
			return value.getTime();
		},
		parseLiteral(ast) {
			if (ast.kind === Kind.INT) {
				return new Date(ast.value);
			}
			return null;
		},
	}),
};

module.exports = { resolvers };
